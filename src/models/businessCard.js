const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 4,
 
  },
  alt: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256
  }
});

const addressSchema = new mongoose.Schema({
  state: {
    type: String
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  houseNumber: {
    type: Number,
    required: true,
    min: 1
  },
  zip: {
    type: Number
  }
});

const businessCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256
  },
  subtitle: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 11,

  },
  email: {
    type: String,
    required: true,
    minlength: 5,

  },
  web: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 4,

  },
  image: {
    type: imageSchema,
    required: true
  },
  address: {
    type: addressSchema,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bizNumber: {
    type: Number,
    required: true,
    unique: true,
    default: () => Math.floor(Math.random() * 1000000)
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

const BusinessCard = mongoose.model('BusinessCard', businessCardSchema);

module.exports = BusinessCard;