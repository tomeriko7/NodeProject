import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { generateToken } from '../utils/token.js';

export const createUser = async (userData) => {
    const { name, email, password, phone, address, image, isBusiness } = userData;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        image,
        isBusiness
    });

    await user.save();
    
    // Generate token
    const tokenPayload = {
        _id: user._id,
        email: user.email,
        isBusiness: user.isBusiness
    };
    const token = generateToken(tokenPayload);
    
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        isBusiness: user.isBusiness,
        token
    };
};

export const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw new Error('Invalid email or password');
    }

    const tokenPayload = {
        _id: user._id,
        email: user.email,
        isBusiness: user.isBusiness
    };
    const token = generateToken(tokenPayload);
    
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        isBusiness: user.isBusiness,
        token
    };
};

export const getAllUsers = async () => {
    return await User.find().select('-password');
};

export const getUserById = async (userId) => {
    const user = await User.findById(userId).select('-password');
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

export const updateUser = async (userId, updateData) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    // If password is being updated, hash it
    if (updateData.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    Object.assign(user, updateData);
    await user.save();
    
    const updatedUser = user.toObject();
    delete updatedUser.password;
    return updatedUser;
};

export const updateBusinessStatus = async (userId, isBusiness) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    user.isBusiness = isBusiness;
    await user.save();
    
    const updatedUser = user.toObject();
    delete updatedUser.password;
    return updatedUser;
};

export const deleteUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    await user.deleteOne();
    return { message: 'User deleted successfully' };
};
