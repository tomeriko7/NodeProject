import { Router } from "express";

import {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  updateBusinessStatus,
  deleteUser,
} from "../controller/auth.controller.js";
import {
  createUserSchema,
  loginSchema,
} from "../validation/user.validation.js";
import { validateUser } from "../middleware/user.middleware.js";
import { authenticateToken } from "../utils/token.js";

const router = Router();
router.post("/register", validateUser(createUserSchema), register);
router.post("/login", validateUser(loginSchema), login);
router.get("/getAllUsers", getAllUsers);
router.get("/getUserById", authenticateToken, getUserById);
router.put(
  "/updateUser",
  validateUser(createUserSchema),
  authenticateToken,
  updateUser
);
router.patch("/updateBusinessStatus", authenticateToken, updateBusinessStatus);
router.delete("/deleteUser", authenticateToken, deleteUser);

export default router;
