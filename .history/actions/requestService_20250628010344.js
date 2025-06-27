"use server"

import { auth } from "@/auth";
import { Service } from "@/models/Service";
import { User } from "@/models/User";
import { formatTo12Hour } from "@/utils/formatDate";
import { sendMessageToTelegram } from "@/utils/sendTelegramMessage";
import { revalidatePath } from "next/cache";

export async function requestService(booking, prevState, formData) {

    const session = await auth();
    if (!session) {
        return console.log("Access denied! you are not login");
    }
    const admin = await User.findOne({ isAdmin: true });
    try {
        if (!formData || typeof formData.get !== "function") {
            console.error("Invalid or missing formData:", formData);
            return { error: "No valid form data received" };
        }
   
    const serviceType = formData.get("serviceType");
    const startDate = formData.get("startDate");
    const startTime = formData.get("startTime");
    const note = formData.get("note");
     const price= formData.get("price");

    const serviceData = {
        userId: booking.userId._id,
        roomId: booking.roomId._id,
        serviceType,
        startDate,
        startTime,
        price,
        note,
        status: 'pending'
    }
   
    await Service.create(serviceData)
    revalidatePath('/dashboard/services')

  await sendMessageToTelegram(
  admin.telegramChatId,
  `<b>📢 New Service Request</b>\n\n<b>👤 User:</b> ${booking.userId.username} (${booking.userId.phone})\n<b>🛠️ Service Type:</b> ${serviceType}\n<b>🏠 Room Number:</b> ${booking.roomId.roomName}\n<b>📅 Schedule:</b> ${startDate}\n<b>⏰ Time:</b> ${formatTo12Hour(startTime)}\n<b>📝 Note:</b> ${note || "None"}\n<b>💵 Price:</b> $${price}\n\nPlease review and take action.\n<b>👉 Visit here to see your progress: http://localhost:3000/dashboard/</b>`
);

console.log("Service request notification sent to admin successfully!");

    console.log("Request sent successfully!")
        return { success: true, message: "Request sent successfully!" };

    } catch (err) {
        return { err: 'Fieled to requesting service!' }
    }
}