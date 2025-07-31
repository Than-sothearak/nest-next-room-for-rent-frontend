"use server";
import { auth } from "@/auth";
import { Booking } from "@/models/Booking";
import { Invoice } from "@/models/Invoice";
import { Room } from "@/models/Room";
import { User } from "@/models/User";
import { mongoDb } from "@/utils/connectDB";
import { deleteFileFromS3, uploadFileToS3 } from "@/utils/uploadImageFileToS3";

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
    const contract = formData.get("contract");
    const roomId = formData.get("roomId");
    const startDate = formData.get("startDate");
    const dueDate = formData.get("dueDate");
    const rent = formData.get("rent");
    const deposit = formData.get("deposit");
    const status = formData.get("status");
    const paymentStatus = formData.get("paymentStatus");
    const notes = formData.get("notes");
    const files = formData.getAll("files");
    const properties = propertiesFormData(formData);
    const parking = parkingFormData(formData.get("parking"), formData.get("parkingSize"));


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
      paymentStatus: paymentStatus || "unpaid",
      properties,
      parking,
    };

    const errors = validateProductFields(bookingData);
    if (Object.keys(errors).length > 0) return { errors, message: "Please input all required fields" };

    const existingName = await Booking.findOne({
      roomId: formData.get("roomId"),
    });
    if (existingName) {
      errors.roomId = "This room is already booked";
      return { errors, message: "This room is already booked" };
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

    
    let invoiceId = "00001";
    let invoiceMonth
    const newMonth = getMonthString(startDate) || "2025-1";
    try {
       const counter = await Invoice.findOneAndUpdate(
    { month: "invoice" },
    { $inc: { number: 1 } },
    { upsert: true, new: true }
  );

      invoiceId = String(counter.number).padStart(5, '0');
    } catch (err) {
      console.log(err)
    }

    invoiceMonth = newMonth

    await Booking.create({
      ...bookingData,
      invoiceId,
      invoiceMonth,
      files: fileUrls,
    });

    await Room.findByIdAndUpdate(
      roomId,
      { status: 0 } // Assuming 0 means booked
    );

    console.log("Booking created successfully");
  } catch (error) {
    console.error("Error creating booking:", error);
    return { error: "Failed to create booking due to a server error", message: "Failed to create booking due to a server error" };
  }

  return { success: true, message: "Booking added successfully!", invoiceId: invoiceId };
}

export async function updateBooking(bookId, prevState, formData) {

  const session = await auth();
  if (!session?.user?.isAdmin) {
    return console.log("Access denied! you are not admin");
  }
  const booking = await Booking.findById(bookId);
  if (!booking) {
    return { error: "Booking not found" };
  }

  const oldRoomId = booking.roomId?.toString();

  try {
    const userId = formData.get("userId");
    const contract = formData.get("contract");
    const roomId = formData.get("roomId");
    const startDate = formData.get("startDate");
    const dueDate = formData.get("dueDate");
    const rent = formData.get("rent");
    const deposit = formData.get("deposit");
    const status = formData.get("status");
    const invoiceSent = formData.get("invoiceSent");
    const paymentStatus = formData.get("paymentStatus");
    const notes = formData.get("notes");
    const files = formData.getAll("files");
    const removedFiles = formData.getAll("removedFiles");
    const properties = propertiesFormData(formData);
    const parking = parkingFormData(formData.get("parking"), formData.get("parkingSize"));



    const updatedFileUrls = booking.files.filter(
      (file) => !removedFiles.includes(file) // Remove only matching URLs
    );
    let fileUrls = updatedFileUrls || [];

    const bookingData = {
      userId: userId,
      roomId: roomId,
      invoiceSent,
      startDate,
      dueDate,
      rent,
      deposit,
      notes,
      contract,
      files: fileUrls,
      status: status || "active",
      paymentStatus: paymentStatus || "unpaid",
      properties,
      parking,
    };

    const errors = validateProductFields(bookingData);
    if (Object.keys(errors).length > 0) return { errors, message: "Please input all required fields" };

    try {
      if (removedFiles && removedFiles.length > 0) {
        for (const removedFile of removedFiles) {
          const oldkey = removedFile.split("/").pop();
          if (oldkey) {
            await deleteFileFromS3(oldkey);
          }
        }
      } else {
        console.log("No file remove!");
      }
    } catch (err) {
      console.log(err);
    }

    if (files && files.length > 0 && files[0].size > 0) {
      for (const file of files) {
        if (file.size > 0) {
          const fileUrl = await uploadFileToS3(file);
          fileUrls.push(fileUrl);
          console.log("File uploaded to S3:", fileUrl);
        }
      }
      console.log(
        "-----------------------------------------------------------------------------------------------------------------------------"
      );
      console.log(`Total file ${files.length} uploaded to S3 successfully`);
    }

    console.log("Files URLs after processing:", fileUrls);
    
        let invoiceId = 1
    if (booking?.invoiceId) {
      invoiceId = booking?.invoiceId;
    }
    let invoiceMonth
    const oldMonth = booking.invoiceMonth || getMonthString(booking.startDate);
    const newMonth = getMonthString(startDate);
    try {
      if (oldMonth !== newMonth) {
    const counter = await Invoice.findOneAndUpdate(
    { month: "invoice" },
    { $inc: { number: 1 } },
    { upsert: true, new: true }
  );

      invoiceId = String(counter.number).padStart(5, '0');
      }
    } catch (err) {
      console.log(err)
    }
    invoiceMonth = newMonth
    await Booking.updateOne({ _id: bookId }, {...bookingData, invoiceId, invoiceMonth});
    
    // Update room status accordingly
    await syncRoomStatuses({
      oldRoomId,
      newRoomId: roomId?.toString(),
      bookingStatus: status,
    });

    async function syncRoomStatuses({ oldRoomId, newRoomId, bookingStatus }) {
      // Free old room if changed
      if (oldRoomId && oldRoomId !== newRoomId) {
        await Room.findByIdAndUpdate(oldRoomId, { status: 1 });
      }

      // Mark new room as occupied if booking is active
      if (newRoomId) {
        const shouldBeOccupied = bookingStatus === "active";
        await Room.findByIdAndUpdate(newRoomId, {
          status: shouldBeOccupied ? 0 : 1,
        });
      }
    }

    console.log("Booking updated!");
    return { success: true, message: "Booking update successfully!", invoiceId: invoiceId };
  } catch (err) {
    console.error("Error updating room:", err);
    return { error: "Failed to update booking due to a server error", message: "Failed to update booking due to a server error" };
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
        $or: [
          { roomName: { $regex: query, $options: "i" } },
        ],
      });
      const matchedRoomIds = matchedRooms.map((room) => room._id);

      const matchedUsers = await User.find({
        $or: [
          { phone: { $regex: query, $options: "i" } },
          { username: { $regex: query, $options: "i" } }
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
      .skip(ITEM_PER_PAGE * (page - 1))
      .sort({ createdAt: -1 });

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
  if (!contract) errors.contract = "Contract is required";
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
    if (name === "part") {
      currentPart = { part: value, values: [] };
      properties.push(currentPart);
    } else if (name === "values" && currentPart) {
      const splitValues = value.split(";");
      currentPart.values = [...currentPart.values, ...splitValues];
    }
  }

  return properties;
}

function parkingFormData(name, size) {
  let parking = { slot: name, size: size };

  return parking
}


function getMonthString(date) {
  if (!date) {
    return 
  }
  return new Date(date).toISOString().slice(0, 7); // "YYYY-MM"
}


