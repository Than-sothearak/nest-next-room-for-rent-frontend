"use server";

import { auth } from "@/auth";
import { User } from "@/models/User";
import { mongoDb } from "@/utils/connectDB";
import { sendMessageToTelegram } from "@/utils/sendTelegramMessage";

export async function sendMessageToUser(userData, prevState, formData) {
  await mongoDb();

  const session = await auth();
  if (!session.user.isAdmin) {
    return { error: "Access denied! You are not logged in." };
  }
  const message = formData.get("message");
  try {
    const user = await User.findById(userData._id);
    if (!user) {
      console.error("User not found:");
      return {
        error: "User not found.",
        message: "No user found with the provided ID.",
      };
    } else if (!user.telegramChatId) {
      console.error("Telegram chat ID not found for user:", userData._id);
      return {
        error: "Telegram chat ID not found.",
        message: "User does not have a Telegram chat ID.",
      };
    }

    await sendMessageToTelegram(user.telegramChatId, message);
    console.log("Message sent to Telegram:", message);
    return { success: true, message: "Message sent successfully." };
  } catch (error) {
    console.error("Error sending message:", error);
    return { error: "Failed to send message.", message: error.message };
  }
}
