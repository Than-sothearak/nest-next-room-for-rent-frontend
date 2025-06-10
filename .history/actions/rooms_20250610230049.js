"use server";
import { Room } from "@/models/Room";
import { mongoDb } from "@/utils/connectDB";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { deleteFileFromS3, uploadFileToS3 } from "@/utils/uploadFileToS3";

await mongoDb();

export async function getRoom(query, page = 1) {
  const ITEM_PER_PAGE = 20;

  try {
    if (query) {
      const rooms = await Room.find({
        $or: [
          { roomNumber: { $regex: query, $options: "i" } },
          // Add other searchable fields if any
        ],
      })
        .lean()
        .populate("category")
        .populate("parentCategory");
      const count = rooms.length;
      return { rooms, count, ITEM_PER_PAGE };
    }

    const rooms = await Room.find()
      .sort({ createdAt: -1 })
      .populate("category")
      .populate("parentCategory")
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    const count = await Room.countDocuments();
    return { rooms, count, ITEM_PER_PAGE };
  } catch (err) {
    console.error("Error fetching rooms:", err);
    return { error: "Failed to fetch due to a server error" };
  }
}

export async function addRoom(prevState, formData) {
  try {
    if (!formData || typeof formData.get !== "function") {
      console.error("Invalid or missing formData:", formData);
      return { error: "No valid form data received" };
    }

    const roomNumber = formData.get("roomNumber");
    const floor = formData.get("floor");
    const price = Number(formData.get("price"));
    const status = formData.get("status") || "available";
    const description = formData.get("description");
    const parentCategory = formData.get("parentCategory") || null;
    const category = formData.get("category") || null;
    const imageFiles = formData.getAll("images");
    const properties = propertiesFormData(formData);

    const roomData = {
      roomNumber,
      floor,
      price,
      status,
      description,
      parentCategory,
      category,
      properties,
    };

    // Validate required fields
    const errors = validateRoomFields(roomData);
    if (Object.keys(errors).length > 0) return { errors };

    // Check if roomNumber already exists
    const existingRoom = await Room.findOne({ roomNumber });
    if (existingRoom) {
      errors.roomNumber = "This room number already exists";
      return { errors };
    }

    let imageUrls = [];
    if (imageFiles && imageFiles.length > 0) {
      for (const imageFile of imageFiles) {
        if (imageFile.size > 0) {
          const imageUrl = await uploadFileToS3(imageFile);
          imageUrls.push(imageUrl);
        }
      }
    }

    await Room.create({
      ...roomData,
      imageUrls,
    });

    revalidatePath(`/dashboard/rooms/`);
    redirect("/dashboard/rooms/");
  } catch (err) {
    console.error("Error saving room:", err);
    return { error: "Failed to save due to a server error" };
  }
}

export async function updateRoom(roomId, prevState, formData) {
  const room = await Room.findById(roomId);

  if (!room) {
    return { error: "Room not found" };
  }

  try {
    const roomNumber = formData.get("roomNumber");
    const floor = formData.get("floor");
    const price = Number(formData.get("price"));
    const status = formData.get("status") || "available";
    const description = formData.get("description");
    const parentCategory = formData.get("parentCategory") || null;
    const category = formData.get("category") || null;
    const imageFiles = formData.getAll("images");
    let removedImages = formData.getAll("removeImages") || [];
    const properties = propertiesFormData(formData);

    // Filter out removed images from existing
    const updatedImageUrls = room.imageUrls.filter(
      (url) => !removedImages.includes(url)
    );

    // Delete removed images from S3
    if (removedImages.length > 0) {
      for (const removeImage of removedImages) {
        const oldkey = removeImage.split("/").pop();
        if (oldkey) {
          await deleteFileFromS3(oldkey);
        }
      }
    }

    // Upload new images
    let imageUrls = updatedImageUrls;
    if (imageFiles && imageFiles.length > 0 && imageFiles[0].size > 0) {
      for (const imageFile of imageFiles) {
        if (imageFile.size > 0) {
          const imageUrl = await uploadFileToS3(imageFile);
          imageUrls.push(imageUrl);
        }
      }
    }

    const roomData = {
      roomNumber,
      floor,
      price,
      status,
      description,
      parentCategory,
      category,
      imageUrls,
      properties,
    };

    const errors = validateRoomFields(roomData);
    if (Object.keys(errors).length > 0) return { errors };

    // Update the room
    await Room.updateOne({ _id: roomId }, roomData);
    revalidatePath(`/dashboard/rooms/${roomId}`);
    return { success: true, message: "Room updated successfully!" };
  } catch (err) {
    console.error("Error updating room:", err);
    return { error: "Failed to update room due to a server error" };
  }
}

// Helper function to parse FormData for properties
function propertiesFormData(formData) {
  let properties = {};
  let currentPart = null;

  // Assuming formData contains fields "part" and "value" pairs for properties
  // Adjust if your form structure is different
  for (const [name, value] of formData.entries()) {
    if (name === "part") {
      currentPart = value;
      properties[currentPart] = "";
    } else if (name === "value" && currentPart) {
      properties[currentPart] = value;
      currentPart = null;
    }
  }

  return properties;
}

function validateRoomFields({ roomNumber, floor, price, parentCategory, category }) {
  const errors = {};
  if (!roomNumber) errors.roomNumber = "Room number is required";
  if (!floor) errors.floor = "Floor is required";
  if (price == null || price === "" || isNaN(price)) errors.price = "Price is required and must be a number";
  if (!parentCategory) errors.parentCategory = "Parent category is required";
  if (!category) errors.category = "Category is required";
  return errors;
}
