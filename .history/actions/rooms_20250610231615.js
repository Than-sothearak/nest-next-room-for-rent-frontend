"use server";
import { Product } from "@/models/Product";
import { mongoDb } from "@/utils/connectDB";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { deleteFileFromS3, uploadFileToS3 } from "@/utils/uploadFileToS3";
import { Room } from "@/models/Room";
await mongoDb();

export async function getRoom(query, page) {
  const ITEM_PER_PAGE = 20;

  try {
    if (query) {
      const rooms = await Room.find({
        $or: [
          { roomName: { $regex: query, $options: "i" } },

          { BrandName: { $regex: query, $options: "i" } },
        ],
      })
        .lean()
        .populate("category")
        .populate("parentCategory");
      const count = rooms.length;
      return { rooms, count, ITEM_PER_PAGE };
    }
    const rooms = await Room.find()
      .sort({ createdAt: -1 })
      .populate("category")
      .populate("parentCategory")
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    const count = await Room.countDocuments();
    return { rooms, count, ITEM_PER_PAGE };
  } catch (err) {
    console.error("Error fetching rooms:", err);
    return { error: "Failed to fetch due to a server error" };
  }
}

export async function addRoom(prevState, formData) {
  try {
    if (!formData || typeof formData.get !== "function") {
      console.error("Invalid or missing formData:", formData);
      return { error: "No valid form data received" };
    }

    const roomName = formData.get("roomName");
    const capacity = formData.get("capacity");
    const category = formData.get("category");
    const price = formData.get("price");
    const status = formData.get("status");
    const description = formData.get("description");
    const parentCategory = formData.get("parentCategory");
    const imageFiles = formData.getAll("images");
    const properties = propertiesFormData(formData);

    const roomData = {
      roomName,
      capacity,
      category,
      price,
      status,
      description,
      parentCategory: parentCategory || null,
      properties,
    };

    const errors = validateProductFields(roomData);
    if (Object.keys(errors).length > 0) return { errors };

    const existingName = await Product.findOne({
      productName: formData.get("roomName"),
    });
    if (existingName) {
      errors.productName = "This room is already have";
      return { errors };
    }

    let imageUrls = [];
    console.log("Image files:", imageFiles);
    if (imageFiles && imageFiles.length > 0) {
      for (const imageFile of imageFiles) {
        if (imageFile.size > 0) {
          const imageUrl = await uploadFileToS3(imageFile) // Replace with actual upload logic
          imageUrls.push(imageUrl);
          console.log("Image uploaded to S3:", imageUrl);
        }
      }
    } else {
      console.log("No image provided");
    }
   
    await Room.create({
      ...roomData,
      imageUrls: imageUrls,
    });
  
 
  } catch (err) {
    console.error("Error saving rooms:", err);
    return { error: "Failed to save due to a server error" };
  }

    revalidatePath(`/dashboard/admin/rooms`);
    redirect("/dashboard/admin/rooms/");
   
    
}

export async function updateRoom(productId, prevState, formData) {
  const product = await Product.findById(productId);

  if (!product) {
    return { error: "Product not found" };
  }

  try {
    const productName = formData.get("productName");
    const brandName = formData.get("brandName");
    const category = formData.get("category");
    const price = formData.get("price");
    const stock = formData.get("stock");
    const status = formData.get("status");
    const description = formData.get("description");
    const parentCategory = formData.get("parentCategory");
    const imageFiles = formData.getAll("images");
    let removedImages = formData.getAll("removeImages") || [];
    const properties = propertiesFormData(formData);

    const updatedImageUrls = product.imageUrls.filter(
      (imageUrl) => !removedImages.includes(imageUrl) // Remove only matching URLs
    );
    let imageUrls = updatedImageUrls || [];

    try {
      if (removedImages && removedImages.length > 0) {
        for (const removeImage of removedImages) {
          const oldkey = removeImage.split("/").pop();
          if (oldkey) {
            await deleteFileFromS3(oldkey);
          }
        }
      } else {
        console.log("No images remove!");
      }
    } catch (err) {
      console.log(err);
    }

    if (imageFiles && imageFiles.length > 0 && imageFiles[0].size > 0) {
      for (const imageFile of imageFiles) {
        if (imageFile.size > 0) {
          const imageUrl = await uploadFileToS3(imageFile);
          imageUrls.push(imageUrl);
          console.log("Image uploaded to S3:", imageUrl);
        }
      }
      console.log(
        "-----------------------------------------------------------------------------------------------------------------------------"
      );
      console.log(
        `Total file ${imageFiles.length} uploaded to S3 successfully`
      );
    }

    const productData = {
      productName,
      brandName,
      category,
      price,
      stock,
      status,
      description,
      parentCategory,
      imageUrls,
      properties,
    };

    const errors = validateProductFields(productData);
    if (Object.keys(errors).length > 0) return { errors };

    // Update the product
    await Product.updateOne({ _id: productId }, productData);
    console.log("Product updated!");
    revalidatePath(`/dashboard/products/${productId}`);
    return { success: true, message: "Product update successfully!" };
  } catch (err) {
    console.error("Error updating product:", err);
    return { error: "Failed to update product due to a server error" };
  }
}

// Helper function to parse FormData
function propertiesFormData(formData) {
  let properties = [];
  let currentPart = null;

  for (const [name, value] of formData.entries()) {
    if (name === "part") {
      currentPart = { part: value, value: "" };
      properties.push(currentPart);
    } else if (name === "value" && currentPart) {
      currentPart.value = value;
    }
  }

  return properties;
}

function validateProductFields({
  roomName,
  capacity,
  category,
  price,

  parentCategory,
}) {
  const errors = {};
  if (!roomName) errors.roomName = "Room name is required";
  if (!parentCategory) errors.parentCategory = "Parent category is required";
  if (!capacity) errors.capacity = "Capacity is required";
  if (!category) errors.category = "Category is required";
  if (!price) errors.price = "Price is required";

  return errors;
}
