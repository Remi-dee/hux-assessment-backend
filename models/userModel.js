const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please add a userName"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamps: true,
    collection: "Users",
  }
);

module.exports = mongoose.model("User", userSchema);
