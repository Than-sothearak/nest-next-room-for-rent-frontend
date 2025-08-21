"use server";
const bcrypt = require("bcryptjs");
import { User } from "@/models/User";
import { mongoDb } from "@/utils/connectDB";
import { deleteFileFromS3, uploadFileToS3 } from "@/utils/uploadImageFileToS3";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

await mongoDb();

export async function getUsers(query, page) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return console.log("Access denied!");
  }
  const ITEM_PER_PAGE = 10;

  try {
    if (query) {
      const users = await User.find({
        $or: [{ username: { $regex: query, $options: "i" } }],
      });
      const count = users.length;
      return { users, count };
    }

    const count = await User.countDocuments();
    const users = await User.find()
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { users, count };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch users!");
  }
}

export async function addUsers(prevState, formData) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return console.log("Access denied!");
  }

  if (!formData || typeof formData.get !== "function") {
    console.error("Invalid or missing formData:", formData);
    return { error: "No valid form data received" };
  }

  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
   const status = formData.get("status")
  const address = formData.get("address");
  const gender = formData.get("gender");
  const dateOfBirth = formData.get("dateOfBirth");
  const password = formData.get("password");
  const role = formData.get("role");
  const imageFile = formData.get("image");
  const telegramChatId = formData.get("telegramChatId")



  let errors = {};
  if (name.length >= 21) {
    errors.name =
      "username:" +
      " " +
      name +
      " " +
      "is longer than the maximum allowed length 20";
    return { errors, success: false };
  }

  if (!name || !email || !phone || !password || !address || !role || !gender) {
    if (!name) errors.name = "Name is required";
    if (!gender) errors.gender = "gender is required";
    if (!email) errors.email = "Email is required";
    if (!phone) errors.phone = "Phone is required";
    if (!password) errors.password = "Password is required";
    if (password.length < 6) if (!role) errors.role = "Role is required";
    if (!address) errors.address = "Address is required";
    return { errors };
  }
  const isAdmin = role === "admin";

  console.log(isAdmin)
  const salt = await bcrypt.genSalt(10);
  if (password.length < 6) {
    errors.password =
      "Your password is too short. Please use at least 6 characters.";
    return { errors };
  } else {
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      const existingUserByName = await User.findOne({ username: name });
      if (existingUserByName) {
        errors.name = "This username is already registered";
        return { errors, success: false };
      }

      const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail) {
        errors.email = "This email is already registered";
        return { errors, success: false };
      }

      let imageUrl = "";
      if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadFileToS3(imageFile);
        console.log("Image uploaded to S3:", imageUrl);
      } else {
        console.log("No image provided");
      }

      const userData = {
        username: name,
        gender,
        dateOfBirth,
        email,
        phone,
        isAdmin,
        status,
        address,
        password: hashPassword,
        imageUrl,
        telegramChatId,
      };

      await User.create(userData);
    } catch (err) {
      console.error("Error saving user:", err);

      // Handle Mongoose validation errors
      if (err.name === "ValidationError") {
        const validationErrors = {};
        for (const field in err.errors) {
          validationErrors[field] = err.errors[field].message;
        }

        return { errors: validationErrors, success: false };
      }

      return {
        error: "Failed to save user due to a server error",
        success: false,
      };
    }
  }

  revalidatePath(`/dashboard/users/`);
  redirect("/dashboard/users/");
}

export async function updateUser(userId, prevState, formData) {
  
  const session = await auth();
  if (!session?.user?.isAdmin && session?.user?._id !== userId) {
    return console.log("Access denied!");
  }

  if (!formData || typeof formData.get !== "function") {
    console.error("Invalid or missing formData:", formData);
    return { error: "No valid form data received" };
  }

  try {

    const user = await User.findById(userId);
    if (!user) {
      return { error: "User not found", success: false };
    }

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const status = formData.get("status")
    const gender = formData.get("gender");
    const dateOfBirth = formData.get("dateOfBirth");
    const address = formData.get("address");
    const password = formData.get("password");
    const role = session.user.isAdmin ? formData.get("role") : "user";
    const imageFile = formData.get("image");
      const telegramChatId = formData.get("telegramChatId")

    let errors = {};
    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    if (!phone) errors.phone = "Phone is required";
    if (!address) errors.address = "Address is required";
    if (!role) errors.role = "Role is required";
    if (Object.keys(errors).length > 0) {
      return { errors, success: false };
    }

    const isAdmin = role === "admin";

    // Keep existing image URL if no new image
    let imageUrl = user.imageUrl;

    if (imageFile && imageFile.size > 0) {
      if (user.imageUrl) {
        const oldKey = imageUrl?.split("/").pop();
        if (oldKey) {
          console.log("New image replaced to S3");
          await deleteFileFromS3(oldKey);
        }
      }

      imageUrl = await uploadFileToS3(imageFile);
      console.log("New image uploaded to S3:", imageUrl);
    } else {
      console.log("No new image provided, keeping existing URL:", imageUrl);
    }

    const userData = {
      username: name,
      email,
      status,
      gender,
      dateOfBirth,
      phone,
      isAdmin,
      address,
      imageUrl,
      telegramChatId,
    };
    // Hash password only if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(password, salt);
    }

    await User.updateOne({ _id: userId }, userData);
    return {success: "User successfully updated", message:  "User successfully updated"}
  } catch (err) {
    console.log("Error updating user:", err);
  }


}
