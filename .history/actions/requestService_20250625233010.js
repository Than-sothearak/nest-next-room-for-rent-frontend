"use server"

import { auth } from "@/auth";

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


        return { sucess: "Request has been sent" }

    } catch (err) {
        return { err: 'Fieled to requesting service!' }
    }
}