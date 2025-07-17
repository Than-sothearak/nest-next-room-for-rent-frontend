"use server"
import { auth } from "@/auth";
import { hashPassowrd, verifyPassword } from "@/lib/isVerify";
import { User } from "@/models/User";
import { mongoDb } from "@/utils/connectDB";
import { redirect } from "next/navigation";

export async function changePassword(userId, prevState, formData) {
await mongoDb();
const session = await auth();

  if (!session?.user?.isAdmin && session?.user?._id !== userId)  {
    return console.log("Access denied!")
  }

  await new Promise((resolve) => setTimeout(resolve, 500));
  if (!formData || typeof formData.get !== "function") {
    console.error("Invalid or missing formData:", formData);
    return { error: "No valid form data received" };
  }
  
  try {
    const user = await User.findById(userId);
        if (!user) {
          return { error: "User not found", success: false };
        }

        const oldPassword = formData.get("oldPassword");
        const newPassword = formData.get("newPassword");

        let errors = {};
        if (!oldPassword) errors.oldPassword = "Old password is required";
        if (!newPassword) errors.newPassword = "New password is required";
        if (newPassword.length < 6) {
          errors.newPassword = "Your password is too short. Please use at least 6 characters.";
      }
      
        if (Object.keys(errors).length > 0) {
          return { errors, success: false };
        }
        const passwordsMatch = await verifyPassword(oldPassword, user.password);
        
        if(passwordsMatch === false ) {
            console.log("password not matched")
            errors.oldPassword = "Old password is incorrect";
            return { errors, success: false };
        }
        const newPasswordHash = await hashPassowrd(newPassword)
        await User.updateOne({email: user.email}, {$set: {password: newPasswordHash}})
        
        return {success: "Password successfully updated", message:  "Password successfully updated"}


  } catch (err) {
  console.log(err)
  return {
      errors: "Failed to update password due to a server error",
      success: false,
      message:  "Failed to update password due to a server errorr"
    };
  }

     
}