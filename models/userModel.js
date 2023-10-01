const mongoose = require("mongoose");
const userScema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "role is required"],
      enum: ["admin", "user", "organisation", "hospital"],
    },
    name: {
      type: String,
      required: function () {
        if (this.role === "user" || this.role === "admin") {
          return true;
        }
        return false;
      },
    },
    organisationalName: {
      type: String,
      required: function () {
        if (this.role === "organisation") {
          return true;
        }
        return false;
      },
    },
    hospitalName: {
      type: String,
      required: function () {
        if (this.role === "hospital") {
          return true;
        }
        return false;
      },
    },
    phone: { type: String, required: [true, "phone number is required"] },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    address: { type: String, required: [true, "address is required"] },
    website: { type: String },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userScema);
