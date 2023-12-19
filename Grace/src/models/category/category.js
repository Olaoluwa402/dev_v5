import mongoose from "mongoose";

const categoryShema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categoryShema);

export default Category;
