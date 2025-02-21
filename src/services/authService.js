import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import logger from "../config/logger";
import { generateToken } from "../utils/token";

export const authRegister = async (userData) => {
  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      logger.error("Email already exists in the server", {
        email: userData.email,
        metadata: { action: "register", status: "failed" },
      });
      throw new Error("Email already exists in the server");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({
      ...userData,
      password: hashedPassword,
    });
    await user.save();

    logger.info("User registered successfully", {
      userId: user._id,
      metadata: { action: "register", status: "success" },
    });

    const token = generateToken({
      _id: user._id,
      isBusiness: user.isBusiness,
      isAdmin: user.isAdmin,
    });

    return token;
  } catch (error) {
    logger.error("Registration failed", {
      error: error.message,
      metadata: { action: "register", status: "error" },
    });
    throw error;
  }
};

export const authLogin = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      logger.error("Login failed - User not found", {
        email,
        metadata: { action: "login", status: "failed" },
      });
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.error("Login failed - Invalid password", {
        email,
        metadata: { action: "login", status: "failed" },
      });
      throw new Error("Invalid email or password");
    }

    logger.info("User logged in successfully", {
      userId: user._id,
      metadata: { action: "login", status: "success" },
    });

    const token = generateToken({
      _id: user._id,
      isBusiness: user.isBusiness,
      isAdmin: user.isAdmin,
    });

    return token;
  } catch (error) {
    logger.error("Login failed", {
      error: error.message,
      metadata: { action: "login", status: "error" },
    });
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await User.find({}).select("-password"); //the minus in the string means to REMOVE the password from each user.
    return users;
  } catch (error) {
    logger.error("Error getting all users", {
      error: error.message,
    });
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    logger.error("Error getting user by ID", {
      error: error.message,
      userId: id,
    });
    throw error;
  }
};

export const updateUser = async (id, updateData) => {
  try {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    if (updateData.email) {  // 
      const existingUser = await User.findOne({
        email: updateData.email,
        _id: { $ne: id },
      });
      if (existingUser) {
        throw new Error("Email already exists");
      }
    }

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select("-password");

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    logger.error("Error updating user", {
      error: error.message,
      userId: id,
    });
    throw error;
  }
};

export const updateBusinessStatus = async (id, isBusiness) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { isBusiness },
      { new: true }
    ).select("-password");

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    logger.error("Error updating business status", {
      error: error.message,
      userId: id,
    });
    throw error;
  }
};
export const deleteUser = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    logger.error("Error deleting user", {
      error: error.message,
      userId: id,
    });
    throw error;
  }
};
//logger
