import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, unique: true, },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: Number,  },
    role: { type: String, enum: ["regular", "admin","librarian"], default: "regular" },
    userCode: { type: String, unique: true, required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book"}],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
