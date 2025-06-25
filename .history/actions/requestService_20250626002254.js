"use server"

import { auth } from "@/auth";
import { Service } from "@/models/Service";
import { revalidatePath } from "next/cache";

export async function requestService(booking, prevState, formData) {

    const session = await auth();
    if (!session) {
        return console.log("Access denied! you are not login");
    }

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
        ststus: 'padding'
    }
    await Service.create(serviceData)
    revalidatePath('dashboard/services')
        return { success: true, message: "Request sent successfully!" };

    } catch (err) {
        return { err: 'Fieled to requesting service!' }
    }
}