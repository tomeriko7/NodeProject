import {
  getAllCards,
  getUserCards,
  getCardById as getCardByIdService,
  createCard,
  updateCard,
  toggleLike,
  deleteCard
} from "../services/card.service.js";
import logger from "../config/logger.js";

// Get all cards (public)
export const getAllUsersCards = async (req, res) => {
  try {
    const cards = await getAllCards();

    res.json({
      status: "success",
      results: cards.length,
      data: cards
    });
  } catch (error) {
    logger.error("Error in getAllUsersCards controller", {
      error: error.message
    });

    res.status(500).json({
      status: "error",
      message: "Failed to fetch cards"
    });
  }
};

// Get logged user's cards
export const getLoggedUserCards = async (req, res) => {
  try {
    const cards = await getUserCards(req.user.id);

    res.json({
      status: "success",
      results: cards.length,
      data: cards
    });
  } catch (error) {
    logger.error("Error in getLoggedUserCards controller", {
      error: error.message,
      userId: req.user.id
    });

    res.status(500).json({
      status: "error",
      message: "Failed to fetch your cards"
    });
  }
};

// Get card by ID
export const getCardById = async (req, res) => {
  try {
    const card = await getCardByIdService(req.params.id);

    res.json({
      status: "success",
      data: card
    });
  } catch (error) {
    logger.error("Error in getCardById controller", {
      error: error.message,
      cardId: req.params.id
    });

    if (error.message === "Card not found") {
      return res.status(404).json({
        status: "error",
        message: "Card not found"
      });
    }

    res.status(500).json({
      status: "error",
      message: "Failed to fetch card"
    });
  }
};

// Create new card
export const addCard = async (req, res) => {
  try {
    const cardData = {
      ...req.body,
      userId: req.user.id,  // This comes from the token
      bizNumber: Math.floor(100000 + Math.random() * 900000) // Generate random 6-digit number
    };

    const card = await createCard(cardData);

    res.status(201).json({
      status: "success",
      data: card
    });
  } catch (error) {
    logger.error("Error in addCard controller", {
      error: error.message,
      userId: req.user.id
    });

    res.status(500).json({
      status: "error",
      message: "Failed to create card",
      details: error.message
    });
  }
};

// Update card
export const updateUserCard = async (req, res) => {
  try {
    const updatedCard = await updateCard(
      req.params.id,
      req.user.id,
      req.body
    );

    res.json({
      status: "success",
      data: updatedCard
    });
  } catch (error) {
    logger.error("Error in updateUserCard controller", {
      error: error.message,
      cardId: req.params.id,
      userId: req.user.id
    });

    if (error.message === "Card not found") {
      return res.status(404).json({
        status: "error",
        message: "Card not found"
      });
    }

    if (error.message === "Not authorized") {
      return res.status(403).json({
        status: "error",
        message: "Not authorized to update this card"
      });
    }

    res.status(500).json({
      status: "error",
      message: "Failed to update card"
    });
  }
};

// Like/Unlike card
export const LikeAndUnlikeCards = async (req, res) => {
  try {
    const card = await toggleLike(req.params.id, req.user.id);

    res.json({
      status: "success",
      data: card
    });
  } catch (error) {
    logger.error("Error in LikeAndUnlikeCards controller", {
      error: error.message,
      cardId: req.params.id,
      userId: req.user.id
    });

    if (error.message === "Card not found") {
      return res.status(404).json({
        status: "error",
        message: "Card not found"
      });
    }

    res.status(500).json({
      status: "error",
      message: "Failed to update like status"
    });
  }
};

// Delete card
export const deleteUserCard = async (req, res) => {
  try {
    await deleteCard(
      req.params.id,
      req.user.id,
      req.user.isAdmin
    );

    res.json({
      status: "success",
      message: "Card deleted successfully"
    });
  } catch (error) {
    logger.error("Error in deleteUserCard controller", {
      error: error.message,
      cardId: req.params.id,
      userId: req.user.id
    });

    if (error.message === "Card not found") {
      return res.status(404).json({
        status: "error",
        message: "Card not found"
      });
    }

    if (error.message === "Not authorized") {
      return res.status(403).json({
        status: "error",
        message: "Not authorized to delete this card"
      });
    }

    res.status(500).json({
      status: "error",
      message: "Failed to delete card"
    });
  }
};