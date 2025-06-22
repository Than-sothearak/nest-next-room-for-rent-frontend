"use server";
import { auth } from "@/auth";
import { Booking } from "@/models/Booking";
import { Room } from "@/models/Room";
import { User } from "@/models/User";
import { mongoDb } from "@/utils/connectDB";
import { uploadFileToS3 } from "@/utils/uploadImageFileToS3";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
 
export async function createBooking(prevState, formData) {
  await mongoDb();

  const session = await auth();
  if (!session?.user?.isAdmin) {
    return console.log("Access denied! you are not admin");
  }

  try {
    if (!formData || typeof formData.get !== "function") {
      console.error("Invalid or missing formData:", formData);
      return { error: "No valid form data received" };
    }

    const userId = formData.get("userId");
    const contract = formData.get("contract")
    const roomId = formData.get("roomId");
    const startDate = formData.get("startDate");
    const dueDate = formData.get("dueDate");
    const rent = formData.get("rent");
    const deposit = formData.get("deposit");
    const status = formData.get("status");
    const notes = formData.get("notes");
    const files = formData.getAll("files");
    const properties = propertiesFormData(formData);

    const bookingData = {
      userId,
      roomId,
      startDate,
      dueDate,
      rent,
      deposit,
      notes,
      contract,
      files,
      status: status || "active",
      properties
    };

    const errors = validateProductFields(bookingData);
    if (Object.keys(errors).length > 0) return { errors };

    const existingName = await Booking.findOne({
      roomId: formData.get("roomId"),
    });
    if (existingName) {
      errors.roomId = "This room is already booked";
      console.log("XX This room is already booked XX");
      return { errors };
    }

    let fileUrls = [];
    console.log("files:", files);
    if (files && files.length > 0) {
      for (const file of files) {
        if (file.size > 0) {
          const fileUrl = await uploadFileToS3(file); // Replace with actual upload logic
          fileUrls.push(fileUrl);
          console.log("File uploaded to S3:", fileUrls);
        }
      }
    } else {
      console.log("No file provided");
    }

    await Booking.create({
      ...bookingData,
      files: fileUrls,
    });

    await Room.findByIdAndUpdate(
      roomId,
      { status: 0 }, // Assuming 0 means booked
     
    );

    console.log("Booking created successfully");
  } catch (error) {
    console.error("Error creating booking:", error);
    return { error: "Failed to create booking due to a server error" };
  }

  revalidatePath(`/dashboard/booking`);
  redirect("/dashboard/booking/");
}

export async function updateBooking(bookId, prevState, formData) {
 await mongoDb();
  const booking = await Booking.findById(bookId);
   const session = await auth();
    if (!session?.user?.isAdmin) {
      return console.log("Access denied! you are not admin");
    }
  
  if (!booking) {
    return { error: "Booking not found" };
  }

  try {
      const userId = formData.get("userId");
    const contract = formData.get("contract")
    const roomId = formData.get("roomId");
    const startDate = formData.get("startDate");
    const dueDate = formData.get("dueDate");
    const rent = formData.get("rent");
    const deposit = formData.get("deposit");
    const status = formData.get("status");
    const notes = formData.get("notes");
    const files = formData.getAll("files");
    const properties = propertiesFormData(formData);

  
    const bookingData = {
       userId: new mongoose.Types.ObjectId(userId),
      roomId: new mongoose.Types.ObjectId(roomId),
      startDate,
      dueDate,
      rent,
      deposit,
      notes,
      contract,
      files,
      status: status || "active",
      properties
    };

        const errors = validateProductFields(bookingData);
    if (Object.keys(errors).length > 0) return { errors };


     const updatedFileUrls = booking.files.filter(
          (file) => !removedFile.includes(file) // Remove only matching URLs
        );
        let fileUrls = updatedFileUrls || [];
    
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
 
  
    
    await Booking.updateOne({ _id: bookId }, bookingData);

    revalidatePath(`/dashboard/booking/${bookId}`);
        console.log("Booking updated!");
    return { success: true, message: "Booking update successfully!" };
  } catch (err) {
    console.error("Error updating room:", err);
    return { error: "Failed to update booking due to a server error" };
  }
}


export async function getBooking(query, page) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return console.log("Access denied!");
  }
  await mongoDb();
  const ITEM_PER_PAGE = 20;

  let sort = {};

  try {
    if (query) {

      const matchedRooms = await Room.find({
        roomName: { $regex: query, $options: "i"}
      })
      const matchedRoomIds = matchedRooms.map((room) => room._id);

      const matchedUsers = await User.find({
      $or: [
        { phone: { $regex: query, $options: "i" } },
      ],
    });
    const matchedUserIds = matchedUsers.map((user) => user._id);

      const booking = await Booking.find({
        $or: [
        { userId: { $in: matchedUserIds } },
        { roomId: { $in: matchedRoomIds } },
      ],
      })
        .populate("userId")
        .populate("roomId");
      const count = booking.length;
      return { booking, count };
    }

    const count = await Booking.countDocuments();
    const booking = await Booking.find()
      .populate("userId")
      .populate("roomId")
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
  


    return { booking, count };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch booking!");
  }
}


function validateProductFields({
  userId,
  roomId,
  startDate,
  dueDate,
  rent,
  deposit,
  contract,
}) {
  const errors = {};
  if (!contract) errors.contract = "Contract is required"
  if (!userId) errors.userId = "User name is required";
  if (!roomId) errors.roomId = "Room number is required";
  if (!startDate) errors.startDate = "Start date is required";
  if (!dueDate) errors.endDate = "End date is required";
  if (!deposit) errors.deposit = "Price is required";
  if (!rent) errors.rent = "Price is required";

  return errors;
}

// Helper function to parse FormData
function propertiesFormData(formData) {
  let properties = [];
  let currentPart = null;

  for (const [name, value] of formData.entries()) {
    if (name === "service") {
      currentPart = { service: value, price: "" };
      properties.push(currentPart);
    } else if (name === "price" && currentPart) {
      currentPart.price = value;
    }
  }

  return properties;
}