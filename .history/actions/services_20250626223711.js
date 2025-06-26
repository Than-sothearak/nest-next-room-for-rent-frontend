"use server";
import { auth } from "@/auth";
import { Service } from "@/models/Service";
import { mongoDb } from "@/utils/connectDB";
import { revalidatePath } from "next/cache";
await mongoDb();

export async function getServices(query, page, sortKey) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return console.log("Access denied!");
  }

  try {
    const ITEM_PER_PAGE = 20;

    let key = {};
    if (sortKey === "requesting") {
      key.status = { $in: ["pending", "cancelled", "accepted"] };
    }
    if (sortKey === "processing") {
      key = { status: "accepted" };
    }
    if (sortKey === "completed") {
      key = { status: "cancelled" };
    }

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
    const services = await Service.find(key)
      .sort({ createdAt: -1 })
      .populate("roomId")
      .populate("userId")
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { services, count };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch orders!");
  }
}

export async function acceptService(serviceId) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return { error: "Access denied!" };
  }
  const date = new Date();           // any Date you want to display
  const readable = date.toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",        // Jakarta = WIB (UTC+7)
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,                   // force 24-hour clock
    // hourCycle: "h23"              // optional, but explicit
  });

  console.log(readable); // e.g. "22:26

  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return { error: "Service not found!" };
    }

    service.status = "accepted";
  
    await service.save();
    revalidatePath("/dashboard/services");
    return { message: "Service accepted successfully!" };
  } catch (err) {
    console.error(err);
    return { error: "Failed to accepted service!" };
  }
}

export async function cancelService(serviceId) {
  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return { error: "Service not found" };
    }

    const date = new Date();           // any Date you want to display
    const readable = date.toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",        // Jakarta = WIB (UTC+7)
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,                   // force 24-hour clock
      // hourCycle: "h23"              // optional, but explicit
    });

    console.log(readable); // e.g. "22:26
    service.status = "cancelled";
 
    await service.save();
    revalidatePath("/dashboard/services");

    return { success: true, message: "Service cancelled successfully!" };
  } catch (err) {
    console.error("Error cancelling service:", err);
    return { error: "Failed to cancel service" };
  }
}
