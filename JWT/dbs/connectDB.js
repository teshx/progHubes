import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URL);
      console.log(`mongodb is connected: ${conn.connection.host}`);
    } catch (error) {
      console.log("Error :", error);
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
