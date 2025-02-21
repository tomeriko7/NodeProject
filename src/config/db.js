import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../config/logger.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info("Connected to MongoDB successfully");
  } catch (err) {
    logger.error("MongoDB connection error", err);
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  logger.info("MongoDB reconnected");
});

export default connectDB;
