// controllers/user.controller.js
import * as userService from '../services/user.service.js';
import logger from '../config/logger.js';

// 1. Register user - POST /users
export const register = async (req, res) => {
    try {
        const { name, email, password, phone, address, image, isBusiness } = req.body;
        
        const userData = await userService.createUser({
            name,
            email,
            password,
            phone,
            address,
            image,
            isBusiness
        });

        logger.info('User registered successfully', { email });

        res.status(201).json({
            status: 'success',
            data: userData
        });

    } catch (error) {
        logger.error('Registration error', {
            error: error.message,
            stack: error.stack,
            email: req.body.email,
            body: req.body
        });

        if (error.message === 'Email already exists') {
            return res.status(409).json({
                status: 'error',
                message: error.message
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            details: error.message
        });
    }
};

// 2. Login user - POST /users/login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await userService.loginUser(email, password);

        logger.info('User logged in successfully', { email });

        res.json({
            status: 'success',
            data: { token }
        });

    } catch (error) {
        logger.error('Login error', {
            error: error.message,
            email: req.body.email
        });

        res.status(401).json({
            status: 'error',
            message: 'Invalid email or password'
        });
    }
};

// 3. Get all users - GET /users
export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        
        logger.info('Retrieved all users', { count: users.length });

        res.json({
            status: 'success',
            data: users
        });

    } catch (error) {
        logger.error('Error fetching users', {
            error: error.message
        });

        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve users'
        });
    }
};

// 4. Get user by ID - GET /users/:id
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);

        logger.info('User retrieved', { userId: id });

        res.json({
            status: 'success',
            data: user
        });

    } catch (error) {
        logger.error('Error fetching user', {
            error: error.message,
            userId: req.params.id
        });

        if (error.message === 'User not found') {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve user'
        });
    }
};

// 5. Update user - PUT /users/:id
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await userService.updateUser(id, req.body);

        logger.info('User updated', { userId: id });

        res.json({
            status: 'success',
            data: updatedUser
        });

    } catch (error) {
        logger.error('Error updating user', {
            error: error.message,
            userId: req.params.id
        });

        if (error.message === 'User not found') {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        if (error.message === 'Email already exists') {
            return res.status(409).json({
                status: 'error',
                message: error.message
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Failed to update user'
        });
    }
};

// 6. Update business status - PATCH /users/:id
export const updateBusinessStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isBusiness } = req.body;

        if (typeof isBusiness !== 'boolean') {
            return res.status(400).json({
                status: 'error',
                message: 'isBusiness must be a boolean value'
            });
        }

        const updatedUser = await userService.updateBusinessStatus(id, isBusiness);

        logger.info('Business status updated', { 
            userId: id,
            isBusiness 
        });

        res.json({
            status: 'success',
            data: updatedUser
        });

    } catch (error) {
        logger.error('Error updating business status', {
            error: error.message,
            userId: req.params.id
        });

        if (error.message === 'User not found') {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Failed to update business status'
        });
    }
};

// 7. Delete user - DELETE /users/:id
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userService.deleteUser(id);

        logger.info('User deleted', { userId: id });

        res.json({
            status: 'success',
            message: 'User deleted successfully'
        });

    } catch (error) {
        logger.error('Error deleting user', {
            error: error.message,
            userId: req.params.id
        });

        if (error.message === 'User not found') {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Failed to delete user'
        });
    }
};