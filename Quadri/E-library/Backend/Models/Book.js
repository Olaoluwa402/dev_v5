import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
<<<<<<< HEAD
    coverImage:{type:String, required:true},
    publicationYear: { type: String, required: true },
    isbn: { type: String, unique: true, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
=======
    publicationYear: { type: String, required: true },
    isbn: { type: String, unique: true, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
>>>>>>> 96ce3306fc40d6631d282cb4da188104e6032160
    In_Stock: { type: Number, required: true },
  },
  { timestamps: true }
);

const BookModel = mongoose.model("Book", bookSchema);

export default BookModel;
