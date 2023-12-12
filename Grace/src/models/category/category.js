import mongoose from "mongoose";

const categoryShema = new mongoose.Schema(
  {
    // isbn: {
    // type: Number,
    // unique: true,
    // },
    // title: {
    // type: String,
    // required: [true, "please input title"],
    // },
    // author: {
    // unique: true,
    // type: String,
    // },
    // genre: {
    // type: String,
    // enum: ["libarian", "reader"],
    // },

    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categoryShema);

export default Category;
