import  mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Replace `VARIABLE_NAME` with the correct environment variable name.
const MONGO_URI: string = process.env.mongo_url ?? 'defaultValue';

export const connectDB = async () => {
  try {
    // Ensure MONGO_URI is properly formatted (starting with "mongodb://" or "mongodb+srv://")
    await mongoose.connect(MONGO_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    connection.on("error", (err) => {
      console.log("Error connecting to MongoDB:", err);
    });
    console.log("Database connected");
  } catch (error) {
    console.log("Connection error:", error);
  }
};
