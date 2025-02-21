import Card from '../models/card.model.js';
import logger from '../config/logger.js';

// Get all cards
export const getAllCards = async () => {
    try {
        return await Card.find().populate('userId', 'name email');
    } catch (error) {
        logger.error('Error in getAllCards service', { error: error.message });
        throw error;
    }
};

// Get user's cards
export const getUserCards = async (userId) => {
    try {
        return await Card.find({ userId }).populate('userId', 'name email');
    } catch (error) {
        logger.error('Error in getUserCards service', { error: error.message, userId });
        throw error;
    }
};

// Get card by ID
export const getCardById = async (cardId) => {
    try {
        const card = await Card.findById(cardId).populate('userId', 'name email');
        if (!card) {
            throw new Error('Card not found');
        }
        return card;
    } catch (error) {
        logger.error('Error in getCardById service', { error: error.message, cardId });
        throw error;
    }
};

// Create new card
export const createCard = async (cardData) => {
    try {
        const card = new Card(cardData);
        await card.save();
        return await card.populate('userId', 'name email');
    } catch (error) {
        logger.error('Error in createCard service', { error: error.message });
        throw error;
    }
};

// Update card
export const updateCard = async (cardId, userId, updateData) => {
    try {
        const card = await Card.findOne({ _id: cardId, userId });
        if (!card) {
            throw new Error('Card not found or unauthorized');
        }

        Object.assign(card, updateData);
        await card.save();
        return await card.populate('userId', 'name email');
    } catch (error) {
        logger.error('Error in updateCard service', { error: error.message, cardId, userId });
        throw error;
    }
};

// Toggle like on card
export const toggleLike = async (cardId, userId) => {
    try {
        const card = await Card.findById(cardId);
        if (!card) {
            throw new Error('Card not found');
        }

        const likeIndex = card.likes.indexOf(userId);
        if (likeIndex === -1) {
            card.likes.push(userId);
        } else {
            card.likes.splice(likeIndex, 1);
        }

        await card.save();
        return await card.populate('userId', 'name email');
    } catch (error) {
        logger.error('Error in toggleLike service', { error: error.message, cardId, userId });
        throw error;
    }
};

// Delete card
export const deleteCard = async (cardId, userId) => {
    try {
        const card = await Card.findOne({ _id: cardId, userId });
        if (!card) {
            throw new Error('Card not found or unauthorized');
        }

        await card.deleteOne();
        return { message: 'Card deleted successfully' };
    } catch (error) {
        logger.error('Error in deleteCard service', { error: error.message, cardId, userId });
        throw error;
    }
};
