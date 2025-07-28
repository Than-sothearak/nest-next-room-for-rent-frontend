"use server";

import { auth } from "@/auth";
import { Booking } from "@/models/Booking";
import { Category } from "@/models/Category";
import { Room } from "@/models/Room";
import { User } from "@/models/User";
import { mongoDb } from "@/utils/connectDB";
import { deleteFileFromS3 } from "@/utils/uploadImageFileToS3";
import { revalidatePath } from "next/cache";

export async function deleteById(id, prevState) {
  await mongoDb();
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return console.log("Access denied! you are not admin");
  }
  try {
    if (!id) {
      return { error: "ID is required" };
    }

    const [user, category, booking, room] = await Promise.all([
      User.findById(id),
      Category.findById(id),
      Booking.findById(id),
      Room.findById(id)
    ]);

    if (user) {
      let userImage = user?.imageUrl;
      const oldKey = userImage?.split("/").pop();
      if (oldKey) {
        await deleteFileFromS3(oldKey);
      }
      await User.deleteOne({ _id: id });

      revalidatePath("/dashboard/users");
      console.log('User deleted successfully')
      return { success: "User deleted successfully", message: "User deleted successfully" };
    }

    if (category) {
      await Category.deleteOne({ _id: id });
      revalidatePath("/dashboard/categories");
      console.log('Category deleted successfully')
      return { success: "Category deleted successfully", message: "Category deleted successfully" };
    }

    if (room) {
      let roomImages = room.imageUrls

      if (roomImages && roomImages.length > 0) {
        for (const image of roomImages) {
          const oldKey = image.split("/").pop()
          if (oldKey) {
            await deleteFileFromS3(oldKey)

          }
        }
      }
      await Room.deleteOne({ _id: id });

      revalidatePath("/dashboard/rooms");
      console.log("room deleted successfully")
      return { success: "room deleted successfully", message: "room deleted successfully" };
    }

    if (booking) {
      let bookingFiles = booking.files

      if (bookingFiles && bookingFiles.length > 0) {
        for (const file of bookingFiles) {
          const oldKey = file.split("/").pop()
          if (oldKey) {
            await deleteFileFromS3(oldKey)

          }
        }
      }
      await Booking.deleteOne({ _id: id });
      await User.findOneAndUpdate(
        { telegramChatId: null }
      );
      await Room.findOneAndUpdate(
        { _id: booking.roomId },
        { $inc: { status: 1 } }
      );
      revalidatePath("/dashboard/booking");
      console.log("Booking cancel successfully")
      return { success: "Booking cancel successfully", message: "Booking cancel successfully" };
    }
  } catch (err) {
    console.error("Error deleting...:", err);
    return { error: "Failed to delete due to a server error", message: "Failed to delete due to a server error" };
  }
}
