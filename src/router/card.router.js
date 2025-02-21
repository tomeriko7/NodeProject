import { Router } from "express";
import { authenticateToken } from "../utils/token.js";
import { validateCard } from "../middleware/card.middleware.js";
import {
  createCardSchema,
  updateCardSchema,
} from "../validation/card.validation.js";
import {
  addCard,
  getAllUsersCards,
  getLoggedUserCards,
  getCardById,
  LikeAndUnlikeCards,
  deleteUserCard,
  updateUserCard,
} from "../controller/card.controller.js";

const router = Router();

// Add new card
router.post(
  "/addcard",
  validateCard(createCardSchema),
  authenticateToken,
  addCard
);

// Get all cards
router.get(
  "/cards",

  getAllUsersCards
);

// Get logged user's cards
router.get("/my-cards", authenticateToken, getLoggedUserCards);

// Get card by ID
router.get("/card/:id", authenticateToken, getCardById);

// Update card
router.put(
  "/card/:id",
  validateCard(updateCardSchema),
  authenticateToken,
  updateUserCard
);

// Like/Unlike card
router.patch("/card/:id/like", authenticateToken, LikeAndUnlikeCards);

// Delete card
router.delete("/card/:id", authenticateToken, deleteUserCard);

export default router;
