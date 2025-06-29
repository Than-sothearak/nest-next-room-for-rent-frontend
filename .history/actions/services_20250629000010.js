"use server";
import { auth } from "@/auth";
import { Service } from "@/models/Service";
import { User } from "@/models/User";
import { mongoDb } from "@/utils/connectDB";
import { formatDateOnly, formatTo12Hour } from "@/utils/formatDate";
import { sendMessageToTelegram } from "@/utils/sendTelegramMessage";
import { session } from "grammy";
import { revalidatePath } from "next/cache";
await mongoDb();

export async function getServices(query, page, sortKey, sortDirection) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return console.log("Access denied!");
  }

  try {
    const ITEM_PER_PAGE = 20;

    let key = {};
 

    key.status = { $in: ["pending", "cancelled", "accepted"] };

    if (sortDirection) {
   
      key = { status: sortDirection };
 

     if (sortKey === "processing") {
      key.status = { $in: ["completed", "marked as read"] };
    }
    }
   
    if (sortKey === "completed") {
      key.status = { $in: ["completed", "marked as read"] };
    }

 sortKey
    ? { [sortKey]: sortDirection === "descending" ? -1 : 1 }
    : { date: -1 };

  if (sortKey === "date") {
    sort = { createdAt: sortDirection === "descending" ? -1 : 1 };
  }
  if (sortKey === "price") {
    sort = { totalAmount: sortDirection === "descending" ? -1 : 1 };
  }
  if (sortKey === "status") {
    sort = { paymentStatus: sortDirection === "descending" ? -1 : 1 };
  }
console.log(key)
    // if (query) {
    //   const services = await Service.find({
    //     $or: [
    //       {
    //         serviceType: { $regex: query, $options: "i" },
    //         status: { $regex: query, $options: "i" },
    //       },
    //     ],
    //   });
    //   const count = Service.length;
    //   return { services, count };
    // }

    const count = await Service.countDocuments(key);
    const [pending, accepted, completed] = await Promise.all([
      Service.countDocuments({ status: "pending" }),
      Service.countDocuments({ status: "accepted" }),
      Service.countDocuments({ status: "completed" }),
    ]);

    const serviceCount = [
      {
        status: "pending",
        count: pending,
      },
      {
        status: "accepted",
        count: accepted,
      },
      {
        status: "completed",
        count: completed,
      },
    ];

    const services = await Service.find(key)
      .sort({createAt: -1})
      .populate("roomId")
      .populate("userId")
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { services, count, serviceCount, ITEM_PER_PAGE };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch orders!");
  }
}

export async function acceptService(serviceId, telegramChatId) {

  const session = await auth();
  if (!session?.user?.isAdmin) {
    return { error: "Access denied!" };
  }


  const date = new Date(); // any Date you want to display
  const readable = date.toLocaleString("en-US", {
    timeZone: "Asia/Jakarta", // Jakarta = WIB (UTC+7)
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // force 24-hour clock
    // hourCycle: "h23"              // optional, but explicit
  });

  console.log(readable); // e.g. "22:26

  try {
    const service = await Service.findById(serviceId).populate("userId").populate("roomId");
    if (!service) {
      return { error: "Service not found!" };
    }

    service.status = "accepted";

    await service.save();

  
    await sendMessageToTelegram(telegramChatId, 
      `<b>✅ Service accepted</b>\n\n<b>👤 User:</b> ${service.userId.username} (${service.userId.phone})\n<b>🛠️ Service Type:</b> ${service.serviceType}\n<b>🏠 Room Number:</b> ${service.roomId.roomName}\n<b>📅 Scheduled Date:</b> ${formatDateOnly(service.startDate)}\n<b>⏰ Time:</b> ${formatTo12Hour(service.startTime)}\n<b>👉 Visit here to see your progress: http://192.168.100.4:3000/dashboard/</b>`
    )
    revalidatePath("/dashboard/services");
    return { message: "Service accepted successfully!" };
  } catch (err) {
    console.error(err);
    return { error: "Failed to accepted service!" };
  }
}

export async function cancelService(serviceId) {
  const session = await auth();
  const admin = await User.findOne({ isAdmin: true });

  try {
    const service = await Service.findById(serviceId).populate("userId").populate("roomId");
    if (!service) {
      return { error: "Service not found" };
    }

    const date = new Date(); // any Date you want to display
    const readable = date.toLocaleString("en-US", {
      timeZone: "Asia/Jakarta", // Jakarta = WIB (UTC+7)
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // force 24-hour clock
      // hourCycle: "h23"              // optional, but explicit
    });

    service.status = "cancelled";

    await service.save();

    if (!session?.user?.isAdmin) {
      await sendMessageToTelegram(
        admin?.telegramChatId,
        `<b>🚫 Service Cancelled</b>\n\n<b>👤 User:</b> ${service.userId.username} (${service.userId.phone})\n<b>📝 Note:</b> ${service.note || "Sorry I made a mistake! I will request again if needed!"}\n<b>🛠️ Service Type:</b> ${service.serviceType}\n<b>🏠 Room Number:</b> ${service.roomId.roomName}\n<b>📅 Scheduled Date:</b> ${formatDateOnly(service.startDate)}\n<b>⏰ Time:</b> ${formatTo12Hour(service.startTime)}\n\n<b>The service has been cancelled.</b>`
      );

    }
    revalidatePath("/dashboard/services");
    return { success: true, message: "Service cancelled successfully!" };
  } catch (err) {
    console.error("Error cancelling service:", err);
    return { error: "Failed to cancel service" };
  }
}

export async function markAsCompleted(serviceId) {
  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return { error: "Service not found" };
    }

    const date = new Date();
    service.status = "completed";
    service.completedDate = date;

    await service.save();
    revalidatePath("/dashboard/services");

    return { success: true, message: "Service successfully completed!" };
  } catch (err) {
    console.error("Error cancelling service:", err);
    return { error: "Failed to complete service" };
  }
}

export async function markAsRead(serviceId) {
  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return { error: "Service not found" };
    }

    service.status = "marked as read";

    await service.save();
    revalidatePath("/dashboard/services");

    return { success: true, message: "Service successfully completed!" };
  } catch (err) {
    console.error("Error cancelling service:", err);
    return { error: "Failed to complete service" };
  }
}
