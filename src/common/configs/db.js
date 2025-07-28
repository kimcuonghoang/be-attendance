import mongoose from "mongoose";
import { DB_URI, PORT } from "./enviroments.js";

async function connectDB() {
  try {
    await mongoose.connect(DB_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection error :", error);
  }
}

export default connectDB;
