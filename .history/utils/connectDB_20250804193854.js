import mongoose from "mongoose";

let connection = {}; 

export const mongoDb = async () => {
  try {
    if (connection.isConnected) return;

    const db = await mongoose.connect(process.env.MONGO_DB_URI);

    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};