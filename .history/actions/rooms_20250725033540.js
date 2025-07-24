"use server";
import { Product } from "@/models/Product";
import { mongoDb } from "@/utils/connectDB";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { deleteFileFromS3, uploadFileToS3 } from "@/utils/uploadImageFileToS3";
import { Room } from "@/models/Room";
import { auth } from "@/auth";
import { Booking } from "@/models/Booking";
await mongoDb();

export async function getRoom(query, page, sort) {

    const session = await auth();
    if (!session?.user?.isAdmin) {
        return console.log("Access denied!");
    }

  const ITEM_PER_PAGE = 10;

  try {
    if (query) {
      const rooms = await Room.find({
        $or: [
          { roomName: { $regex: query, $options: "i" } },

          { BrandName: { $regex: query, $options: "i" } },
        ],
      })
        .lean()
        .populate("category")
        .populate("parentCategory");
      const count = rooms.length;
      return { rooms, count, ITEM_PER_PAGE };
    }
   

    if(sort) {
      
  switch (sort) {
    case 'date-asc':
      sort = { createdAt: 1 };
      break;
    case 'date-desc':
      sort = { createdAt: -1 };
      break;
    case 'status-asc':
      sort = { status: 1 };
      break;
    case 'status-desc':
      sort = { status: -1 };
      break;
    default:
      sort = { createdAt: -1 }; // fallback
  }
    }
    

    const rooms = await Room.find()
      .sort(sort || {createdAt: -1})
      .populate("category")
      .populate("parentCategory")
      .populate("bookings")
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    const count = await Room.countDocuments();
console.log(rooms[3].Bookings[0]._id)
    return { rooms, count, ITEM_PER_PAGE };

   
  } catch (err) {
    console.error("Error fetching rooms:", err);
    return { error: "Failed to fetch due to a server error" };
  }
}

export async function addRoom(prevState, formData) {

    const session = await auth();
    if (!session?.user?.isAdmin) {
      return console.log("Access denied! you are not admin");
    }
  
  try {
    if (!formData || typeof formData.get !== "function") {
      console.error("Invalid or missing formData:", formData);
      return { error: "No valid form data received" };
    }

    const roomName = formData.get("roomName");
    const floor = formData.get("floor");
    const capacity = formData.get("capacity");
    const category = formData.get("category");
    const price = formData.get("price");
    const status = formData.get("status");
    const description = formData.get("description");
     const airConditionerCleanDate = formData.get("airConditionerCleanDate")
    const roomMaintenanceDate = formData.get("roomMaintenanceDate")
    const parentCategory = formData.get("parentCategory");
    const imageFiles = formData.getAll("images");
    const properties = propertiesFormData(formData);

    const roomData = {
      airConditionerCleanDate,
      roomMaintenanceDate,
      roomName,
      capacity,
      category,
      price,
      floor,
      status,
      description,
      parentCategory: parentCategory || null,
      properties,
    };

    const errors = validateProductFields(roomData);
    if (Object.keys(errors).length > 0) return { errors };

    const existingName = await Product.findOne({
      productName: formData.get("roomName"),
    });
    if (existingName) {
      errors.productName = "This room is already have";
      return { errors };
    }

    let imageUrls = [];
    console.log("Image files:", imageFiles);
    if (imageFiles && imageFiles.length > 0) {
      for (const imageFile of imageFiles) {
        if (imageFile.size > 0) {
          const imageUrl = await uploadFileToS3(imageFile) // Replace with actual upload logic
          imageUrls.push(imageUrl);
          console.log("Image uploaded to S3:", imageUrl);
        }
      }
    } else {
      console.log("No image provided");
    }
   
    await Room.create({
      ...roomData,
      imageUrls: imageUrls,
    });
  
   console.log("Room add successfully")
  } catch (err) {
    console.error("Error saving rooms:", err);
    return { error: "Failed to save due to a server error", message: "Error saving rooms!" };
  }

    return { success: true, message: "Booking added successfully!" };
   
    
}

export async function updateRoom(roomId, prevState, formData) {

    const session = await auth();
    if (!session?.user?.isAdmin) {
      return console.log("Access denied! you are not admin");
    }
  
  const room = await Room.findById(roomId);
 
  if (!room) {
    return { error: "Room not found" };
  }

  try {
    const roomName = formData.get("roomName");
    const floor = formData.get("floor");
    const capacity = formData.get("capacity");
    const category = formData.get("category");
    const price = formData.get("price");
    const status = formData.get("status");
    const description = formData.get("description");
    const airConditionerCleanDate = formData.get("airConditionerCleanDate")
    const roomMaintenanceDate = formData.get("roomMaintenanceDate")
    const parentCategory = formData.get("parentCategory");
    const imageFiles = formData.getAll("images");
    const properties = propertiesFormData(formData);
    let removedImages = formData.getAll("removeImages") || [];
 

    const updatedImageUrls = room.imageUrls.filter(
      (imageUrl) => !removedImages.includes(imageUrl) // Remove only matching URLs
    );
    let imageUrls = updatedImageUrls || [];

    try {
      if (removedImages && removedImages.length > 0) {
        for (const removeImage of removedImages) {
          const oldkey = removeImage.split("/").pop();
          if (oldkey) {
            await deleteFileFromS3(oldkey);
          }
        }
      } else {
        console.log("No images remove!");
      }
    } catch (err) {
      console.log(err);
    }

    if (imageFiles && imageFiles.length > 0 && imageFiles[0].size > 0) {
      for (const imageFile of imageFiles) {
        if (imageFile.size > 0) {
          const imageUrl = await uploadFileToS3(imageFile);
          imageUrls.push(imageUrl);
          console.log("Image uploaded to S3:", imageUrl);
        }
      }
      console.log(
        "-----------------------------------------------------------------------------------------------------------------------------"
      );
      console.log(
        `Total file ${imageFiles.length} uploaded to S3 successfully`
      );
    }

    console.log("Image URLs after processing:", imageUrls);

    const roomData = {
      roomName,
      airConditionerCleanDate,
      roomMaintenanceDate,
      capacity,
      category,
      price,
      floor,
      status,
      imageUrls,
      description,
      parentCategory: parentCategory || null,
      properties,
    };

    const errors = validateProductFields(roomData);
    if (Object.keys(errors).length > 0) return { errors: errors, message: "Failed to update room please try again" };

    // Update the product
    await Room.updateOne({ _id: roomId }, roomData);

    revalidatePath(`/dashboard/rooms/${roomId}`);
        console.log("Room updated!");
    return { success: true, message: "Room update successfully!" };
  } catch (err) {
    console.error("Error updating room:", err);
    return { error: "Failed to update room due to a server error" };
  }
}

// Helper function to parse FormData
function propertiesFormData(formData) {
  let properties = [];
  let currentPart = null;

  for (const [name, value] of formData.entries()) {
    if (name === "part") {
      currentPart = { part: value, value: "" };
      properties.push(currentPart);
    } else if (name === "value" && currentPart) {
      currentPart.value = value;
    }
  }

  return properties;
}

function validateProductFields({
  roomName,
  capacity,
  category,
  price,
  floor,
  parentCategory,
}) {
  const errors = {};
  if (!roomName) errors.roomName = "Room name is required";
   if (!floor) errors.floor = "Floor is required";
  if (!parentCategory) errors.parentCategory = "Parent category is required";
  if (!capacity) errors.capacity = "Capacity is required";
  if (!category) errors.category = "Category is required";
  if (!price) errors.price = "Price is required";

  return errors ;
}
