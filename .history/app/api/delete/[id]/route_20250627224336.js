// app/api/delete/[id]/route.js
import { NextResponse } from "next/server";
import { auth } from "@/auth";

import { mongoDb } from "@/utils/connectDB";
import { deleteFileFromS3 } from "@/utils/uploadImageFileToS3";

import { User } from "@/models/User";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { Booking } from "@/models/Booking";
import { Room } from "@/models/Room";

import { revalidatePath } from "next/cache";

export const runtime = "nodejs"; // ensure it runs in Node.js environment

export async function DELETE(req, { params }) {

      
  try {
    await mongoDb();

    const session = await auth();
    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { error: "Access denied – admin only" },
        { status: 403 }
      );
    }

  const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const [user, category, product, booking] = await Promise.all([
      User.findById(id),
      Category.findById(id),
      Product.findById(id),
      Booking.findById(id),
    ]);

    // ----- Delete User -----
    if (user) {
      const userImage = user?.imageUrl;
      if (userImage) {
        const key = userImage.split("/").pop();
        if (key) await deleteFileFromS3(key);
      }

      await User.deleteOne({ _id: id });
      revalidatePath("/dashboard/users");
      return NextResponse.json({ success: "User deleted successfully" });
    }

    // ----- Delete Category -----
    if (category) {
      await Category.deleteOne({ _id: id });
      revalidatePath("/dashboard/categories");
      return NextResponse.json({ success: "Category deleted successfully" });
    }

    // ----- Delete Product -----
    if (product) {
      const images = product.imageUrls || [];
      for (const image of images) {
        const key = image.split("/").pop();
        if (key) await deleteFileFromS3(key);
      }

      await Product.deleteOne({ _id: id });
      revalidatePath("/dashboard/products");
      return NextResponse.json({ success: "Product deleted successfully" });
    }

    // ----- Delete Booking -----
    if (booking) {
      const files = booking.files || [];
      for (const file of files) {
        const key = file.split("/").pop();
        if (key) await deleteFileFromS3(key);
      }

      await Booking.deleteOne({ _id: id });

      await User.findOneAndUpdate(
        { _id: booking.userId },
        { $set: { telegramChatId: null } }
      );

      await Room.findOneAndUpdate(
        { _id: booking.roomId },
        { $inc: { status: 1 } }

    console.log('Delted?')
    //   );

      revalidatePath("/dashboard/booking");
      return NextResponse.json({ success: "Booking cancelled successfully" });
    }

    return NextResponse.json(
      { error: "No matching record found for this ID" },
      { status: 404 }
    );
  } catch (err) {
    console.error("Error in DELETE /api/delete/[id]:", err);
    return NextResponse.json(
      { error: "Server error while deleting" },
      { status: 500 }
    );
  }
}
