import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // Add other fields as needed
  },
  { timestamps: true }
);
 
const Book = mongoose.model("Book", bookSchema);

export default Book;
