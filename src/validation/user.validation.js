// validation/user.validation.js
import Joi from 'joi';

// Schema for name object
const nameSchema = Joi.object({
    first: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'First name is required',
            'string.min': 'First name must be at least 2 characters long',
            'string.max': 'First name cannot exceed 50 characters'
        }),
    middle: Joi.string()
        .min(2)
        .max(50)
    
        .messages({
            'string.empty': 'Middle name is required',
            'string.min': 'Middle name must be at least 2 characters long',
            'string.max': 'Middle name cannot exceed 50 characters'
        }),
    last: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Last name is required',
            'string.min': 'Last name must be at least 2 characters long',
            'string.max': 'Last name cannot exceed 50 characters'
        })
});

// Schema for address object
const addressSchema = Joi.object({
    state: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'State is required',
            'string.min': 'State name must be at least 2 characters long'
        }),
    country: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Country is required',
            'string.min': 'Country name must be at least 2 characters long'
        }),
    city: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'City is required',
            'string.min': 'City name must be at least 2 characters long'
        }),
    street: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Street is required',
            'string.min': 'Street name must be at least 2 characters long'
        }),
    houseNumber: Joi.number()
        .min(1)
        .required()
        .messages({
            'number.base': 'House number must be a number',
            'number.min': 'House number must be greater than 0'
        }),
    zip: Joi.number()
        .min(10000)
        .max(999999)
        .required()
        .messages({
            'number.base': 'ZIP code must be a number',
            'number.min': 'Invalid ZIP code',
            'number.max': 'Invalid ZIP code'
        })
});

// Schema for image object
const imageSchema = Joi.object({
    url: Joi.string()
        .uri()
        .required()
        .messages({
            'string.empty': 'Image URL is required',
            'string.uri': 'Image URL must be a valid URL'
        }),
    alt: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Image alt text is required',
            'string.min': 'Image alt text must be at least 2 characters long'
        })
});
export const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'Email address is required',
            'string.email': 'Invalid email address format',
            'any.required': 'Email address is required'
        }),
        
    password: Joi.string()
        .min(6)
        .max(20)
        .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{6,}$/)
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters long',
            'string.max': 'Password cannot exceed 20 characters',
            'string.pattern.base': 'Password must contain uppercase, lowercase, number and special character',
            'any.required': 'Password is required'
        })
}).messages({
    'object.unknown': 'Invalid field in request body'
});
// Main user schema
export const createUserSchema = Joi.object({
    name: nameSchema.required(),
    phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            'string.pattern.base': 'Phone number must contain 10 digits',
            'string.empty': 'Phone number is required'
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Invalid email address',
            'string.empty': 'Email address is required'
        }),
    password: Joi.string()
        .min(6)
        .max(20)
        .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{6,}$/)
        .required()
        .messages({
            'string.pattern.base': 'Password must contain uppercase, lowercase, number and special character',
            'string.min': 'Password must be at least 6 characters long',
            'string.max': 'Password cannot exceed 20 characters',
            'string.empty': 'Password is required'
        }),
    address: addressSchema.required(),
    image: imageSchema.required(),
    isBusiness: Joi.boolean().default(false)
});


