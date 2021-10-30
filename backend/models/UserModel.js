const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    activated: { type: Boolean, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema, "users");
