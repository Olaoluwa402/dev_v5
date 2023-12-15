import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      min: 7,
      max: 12,
      required: [true, "Please enter a username"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter an email address"],
    },
    role: {
      type: String,
      enum: ["regular", "Librarian", "Admin"],
      default: "regular",
      required: [true, "Please choose a role"],
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
