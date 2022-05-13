const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true
    },
    password: String,
    email: String
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
