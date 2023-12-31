import mongoose from "mongoose";

//define your schema
const userShema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      min: 6,
      max: 12,
      required: [true, "Please supply the username"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please supply the email"],
    },
    avatar: {
      type: String,
    },
    inflows: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IncomeExpense",
      },
    ],
    access_tokens: [
      {
        token: {
          type: String,
          unique: true,
          required: true,
        },
        type: {
          type: String,
          enum: ["old", "new"],
          default: "new",
        },
      },
    ],
    role: { type: String, enum: ["regular", "admin"], default: "regular" },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

//register the schema as a mongoose model
const User = mongoose.model("User", userShema);

export default User;
