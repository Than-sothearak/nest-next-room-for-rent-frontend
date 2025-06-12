"use server";
import { auth } from "@/auth";
import { Booking } from "@/models/Booking";
import { mongoDb } from "@/utils/connectDB";
import { uploadFileToS3 } from "@/utils/uploadImageFileToS3";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBooking(prevState, formData) {
  await mongoDb();

   const session = await auth();
    if (!session?.user?.isAdmin) {
      return console.log("Access denied!")
    }
  
  try {
    if (!formData || typeof formData.get !== "function") {
      console.error("Invalid or missing formData:", formData);
      return { error: "No valid form data received" };
    }

    const userId = formData.get("userId");
    const roomId = formData.get("roomId");
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const rent = formData.get("rent");
    const deposit = formData.get("deposit");
    const status = formData.get("status");
    const notes = formData.get("notes");
    const files = formData.getAll("files");

    const bookingData = {
      userId,
      roomId,
      startDate,
      endDate,
      rent,
      deposit,
      notes,
      files,
      status: status || "active",
    };

    const errors = validateProductFields(bookingData);
    if (Object.keys(errors).length > 0) return { errors };

    const existingName = await Booking.findOne({
      roomId: formData.get("roomId"),
    });
    if (existingName) {
      errors.roomId = "This room is already booked";
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

    console.log("Booking created successfully");
  } catch (error) {
    console.error("Error creating booking:", error);
    return { error: "Failed to create booking due to a server error" };
  }

  revalidatePath(`/dashboard/admin/booking`);
  redirect("/dashboard/admin/booking/");
}

export async function updateBooking({ prev, formData, bookingId }) {}

function validateProductFields({
  userId,
  roomId,
  startDate,
  endDate,
  rent,
  deposit,
}) {
  const errors = {};
  if (!userId) errors.userId = "User name is required";
  if (!roomId) errors.roomId = "Room number is required";
  if (!startDate) errors.startDate = "Start date is required";
  if (!endDate) errors.endDate = "End date is required";
  if (!deposit) errors.deposit = "Price is required";
  if (!rent) errors.rent = "Price is required";

  return errors;
}
