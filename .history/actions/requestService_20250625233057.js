"use server"

import { auth } from "@/auth";

export async function requestService(booking, prevState, formData) {

    const session = await auth();
    if (!session) {
        return console.log("Access denied! you are not login");
    }

    console.log(formData)

    try {
        if (!formData || typeof formData.get !== "function") {
            console.error("Invalid or missing formData:", formData);
            return { error: "No valid form data received" };
        }
   
    const roomId = formData.get("roomId");
    const startDate = formData.get("startDate");
    const dueDate = formData.get("dueDate");
    const rent = formData.get("rent");
    const deposit = formData.get("deposit");

        return { sucess: "Request has been sent" }

    } catch (err) {
        return { err: 'Fieled to requesting service!' }
    }
}