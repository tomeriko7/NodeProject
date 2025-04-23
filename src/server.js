import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import logger from "./config/logger.js";
import userRouter from "./router/user.router.js";
import cardRouter from "./router/card.router.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/card", cardRouter);

// Wrap the server startup in an async function
const startServer = async () => {
  try {
    await connectDB();
    logger.info("Connected to DB successfully");
    
    const PORT = 3000;
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to connect to DB", error);
    process.exit(1);
  }
};

startServer();