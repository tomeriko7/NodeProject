import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            required: [true, 'First name is required'],
            minlength: [2, 'First name must be at least 2 characters long'],
            maxlength: [50, 'First name cannot exceed 50 characters']
        },
        middle: {
            type: String,
            required: [true, 'Middle name is required'],
            minlength: [2, 'Middle name must be at least 2 characters long'],
            maxlength: [50, 'Middle name cannot exceed 50 characters']
        },
        last: {
            type: String,
            required: [true, 'Last name is required'],
            minlength: [2, 'Last name must be at least 2 characters long'],
            maxlength: [50, 'Last name cannot exceed 50 characters']
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        maxlength: [1024, 'Password cannot exceed 1024 characters']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^[0-9]{10,13}$/, 'Please enter a valid phone number']
    },
    address: {
        state: {
            type: String,
            required: [true, 'State is required'],
            minlength: [2, 'State must be at least 2 characters long'],
            maxlength: [256, 'State cannot exceed 256 characters']
        },
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
        houseNumber: {
            type: String,
            required: [true, 'House number is required']
        },
        zip: {
            type: String,
            required: [true, 'ZIP code is required'],
            match: [/^[0-9]{5,10}$/, 'Please enter a valid ZIP code']
        }
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
    isBusiness: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdCards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }],
    likedCards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }]
}, {
    timestamps: true
});

// Add indexes for better query performance
userSchema.index({ createdCards: 1 });
userSchema.index({ likedCards: 1 });

// Add instance method to check if user is admin
userSchema.methods.isAdminUser = function() {
    return this.isAdmin;
};

// Add instance method to check if user is business
userSchema.methods.isBusinessUser = function() {
    return this.isBusiness;
};

// Add instance method to check if user owns a card
userSchema.methods.ownsCard = function(cardId) {
    return this.createdCards.includes(cardId);
};

// Add instance method to check if user has liked a card
userSchema.methods.hasLikedCard = function(cardId) {
    return this.likedCards.includes(cardId);
};

const User = mongoose.model('User', userSchema);

export default User;
