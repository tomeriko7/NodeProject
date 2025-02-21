import Joi from "joi";

// Schema for address object
const addressSchema = Joi.object({
  state: Joi.string().min(2).max(50).required().messages({
    "string.empty": "State is required",
    "string.min": "State name must be at least 2 characters long",
    "string.max": "State name cannot exceed 50 characters"
  }),
  country: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Country is required",
    "string.min": "Country name must be at least 2 characters long",
    "string.max": "Country name cannot exceed 50 characters"
  }),
  city: Joi.string().min(2).max(50).required().messages({
    "string.empty": "City is required",
    "string.min": "City name must be at least 2 characters long",
    "string.max": "City name cannot exceed 50 characters"
  }),
  street: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Street is required",
    "string.min": "Street name must be at least 2 characters long",
    "string.max": "Street name cannot exceed 100 characters"
  }),
  houseNumber: Joi.number().min(1).required().messages({
    "number.base": "House number must be a number",
    "number.min": "House number must be greater than 0",
    "any.required": "House number is required"
  }),
  zip: Joi.number().min(10000).max(999999).required().messages({
    "number.base": "ZIP code must be a number",
    "number.min": "Invalid ZIP code",
    "number.max": "Invalid ZIP code",
    "any.required": "ZIP code is required"
  }),
});

// Schema for image object
const imageSchema = Joi.object({
  url: Joi.string().uri().required().messages({
    "string.empty": "Image URL is required",
    "string.uri": "Image URL must be a valid URL",
    "any.required": "Image URL is required"
  }),
  alt: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Image alt text is required",
    "string.min": "Image alt text must be at least 2 characters long",
    "string.max": "Image alt text cannot exceed 100 characters",
    "any.required": "Image alt text is required"
  }),
});

// Card creation schema
export const createCardSchema = Joi.object({
  title: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 2 characters long",
    "string.max": "Title cannot exceed 100 characters"
  }),
  subtitle: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Subtitle is required",
    "string.min": "Subtitle must be at least 2 characters long",
    "string.max": "Subtitle cannot exceed 100 characters"
  }),
  description: Joi.string().min(10).max(500).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description cannot exceed 500 characters"
  }),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    "string.pattern.base": "Phone number must contain exactly 10 digits",
    "string.empty": "Phone number is required"
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email address",
    "string.empty": "Email address is required"
  }),
  web: Joi.string().uri().messages({
    "string.uri": "Website must be a valid URL"
  }),
  image: imageSchema.required(),
  address: addressSchema.required(),
  bizNumber: Joi.number().integer().min(100000).max(999999).messages({
    "number.base": "Business number must be a number",
    "number.min": "Business number must be at least 6 digits",
    "number.max": "Business number cannot exceed 6 digits"
  }),
  likes: Joi.array().items(Joi.string()).default([]),
  userId: Joi.string().messages({
    "string.empty": "User ID is required"
  })
});

// Card update schema (similar to create but all fields optional)
export const updateCardSchema = Joi.object({
  title: Joi.string().min(2).max(100).messages({
    "string.min": "Title must be at least 2 characters long",
    "string.max": "Title cannot exceed 100 characters"
  }),
  subtitle: Joi.string().min(2).max(100).messages({
    "string.min": "Subtitle must be at least 2 characters long",
    "string.max": "Subtitle cannot exceed 100 characters"
  }),
  description: Joi.string().min(10).max(500).messages({
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description cannot exceed 500 characters"
  }),
  phone: Joi.string().pattern(/^[0-9]{10}$/).messages({
    "string.pattern.base": "Phone number must contain exactly 10 digits"
  }),
  email: Joi.string().email().messages({
    "string.email": "Invalid email address"
  }),
  web: Joi.string().uri().messages({
    "string.uri": "Website must be a valid URL"
  }),
  image: imageSchema,
  address: addressSchema
}).min(1).messages({
  "object.min": "At least one field must be provided for update"
});
