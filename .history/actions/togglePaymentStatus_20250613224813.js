"user server";
import { mongoDb } from "@/utils/connectDB";

export async function togglePaymentStatus(id) {
  await mongoDb();

  try {
    if (!id) {
      return { error: "ID is required" };
    }

    console.log("paid")


  } catch (err) {
    console.error("Error deleting...:", err);
    return { error: "Failed to delete user due to a server error" };
  }
}
