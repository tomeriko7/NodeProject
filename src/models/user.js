import mongoose from "mongoose";

const nameSchema = new mongoose.Schema({
  first: {
    type: String,
    require: true,
  },
  middle: {
    type: String,
    require: true,
  },
  last: {
    type: String,
    require: true,
  },
});

const addressSchema = new mongoose.Schema({
  state: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  street: {
    type: String,
    require: true,
  },
  houseNumber: {
    type: Number,
    require: true,
  },
  zip: {
    type: Number,
    require: true,
  },
});

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    require: true,
  },
  alt: {
    type: String,
    require: true,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: nameSchema,
    require: true,
  },
  isBusiness: {
    type: Boolean,
    require: true,
    default: false,
  },
  phone: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  address: {
    type: addressSchema,
    require: true,
  },
  image: {
    type: imageSchema,
    require: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
