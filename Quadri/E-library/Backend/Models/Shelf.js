import mongoose from "mongoose";

const shelfSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    book: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Book", },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const shelfModel = mongoose.model("Shelf", shelfSchema);

export default shelfModel;
