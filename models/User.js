const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    image: String,
    city: String,
    state: {
      type: String,
      default: null,
    },
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
  },
{timestamps: true}); // to create a date and update a date
const User = mongoose.model('User', UserSchema);
module.exports = User;

