import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    default: "usernoprofile.webp",
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isBusinessAccount: {
    type: Boolean,
    required: true,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    required: true,
    default: false,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = new mongoose.model("User", userSchema);

export default User;
