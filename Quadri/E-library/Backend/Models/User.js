import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    role: { type: String, enum: ["regular", "admin","librarian"], default: "regular" },
    userCode: { type: String, unique: true, required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book"}],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
