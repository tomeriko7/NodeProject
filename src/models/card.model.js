import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [2, 'Title must be at least 2 characters long'],
        maxlength: [256, 'Title cannot exceed 256 characters']
    },
    subtitle: {
        type: String,
        required: [true, 'Subtitle is required'],
        minlength: [2, 'Subtitle must be at least 2 characters long'],
        maxlength: [256, 'Subtitle cannot exceed 256 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [2, 'Description must be at least 2 characters long'],
        maxlength: [1024, 'Description cannot exceed 1024 characters']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^[0-9]{10,13}$/, 'Please enter a valid phone number']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
    },
    web: {
        type: String,
        match: [/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/, 'Please enter a valid URL']
    },
    image: {
        url: {
            type: String,
            required: [true, 'Image URL is required'],
            match: [/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/, 'Please enter a valid image URL']
        },
        alt: {
            type: String,
            required: [true, 'Image alt text is required'],
            minlength: [2, 'Alt text must be at least 2 characters long'],
            maxlength: [256, 'Alt text cannot exceed 256 characters']
        }
    },
    address: {
        street: {
            type: String,
            required: [true, 'Street address is required'],
            minlength: [2, 'Street must be at least 2 characters long'],
            maxlength: [256, 'Street cannot exceed 256 characters']
        },
        city: {
            type: String,
            required: [true, 'City is required'],
            minlength: [2, 'City must be at least 2 characters long'],
            maxlength: [256, 'City cannot exceed 256 characters']
        },
        country: {
            type: String,
            required: [true, 'Country is required'],
            minlength: [2, 'Country must be at least 2 characters long'],
            maxlength: [256, 'Country cannot exceed 256 characters']
        },
        zip: {
            type: String,
            required: [true, 'ZIP code is required'],
            match: [/^[0-9]{5,10}$/, 'Please enter a valid ZIP code']
        }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

// Add index for better query performance
cardSchema.index({ userId: 1 });
cardSchema.index({ likes: 1 });

const Card = mongoose.model('Card', cardSchema);

export default Card;
