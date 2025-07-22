// lib/actions.js
"use server";

import { signIn } from "@/auth"; // Points to your NextAuth config
import { AuthError } from "next-auth";
import { getUser } from "@/auth"; // Import from your auth.js
import { verifyPassword } from "@/lib/isVerify";
import { redirect } from "next/navigation";

export async function authenticate(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    // Check if email exists first
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const user = await getUser(email);
    if (!user) {
      return "Email not found.";
    }

   
    // Verify password manually
    const passwordsMatch = await verifyPassword(password, user.password);
    if (!passwordsMatch) {
      return "Incorrect password.";
    }

     // Check if account Deactivated
    if (!user.isAdmin && user.status === 'deactivated') {
      return "Your account has been deactivated!"
    }


    // If email and password are valid, proceed with signIn
    await signIn("credentials", { email, password ,redirect: false});
    console.log("User authenticated successfully");
    redirect("/dashboard");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Something went wrong with credentials."; // Fallback (shouldn’t hit often)
        default:
          return "Something went wrong.";
      }
    }
    throw error; 
  }
}