"use server";
import { redirect } from "next/navigation";

export async function authenticate(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  
  await singIn("credentials", {
    redirect: false,
    email,
    password,
  });

  redirect("/dashboard");
}
