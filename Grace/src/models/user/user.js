// import mongoose from "mongoose";

// const userShema = mongoose.Schema(
//   {
//     username: {
//       type: String,
//       unique: true,
//       min: 6,
//       max: 12,
//       required: [true, "please input username"],
//     },
//     password: {
//       type: String,
//       required: [true, "please input password"],
//     },
//     email: {
//       type: String,
//       unique: true,
//       required: [true, "please input password"],
//     },
//     role: {
//       type: String,
//       enum: ["libarian", "reader"],
//       default: "libarian",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const User = mongoose.model("user", userShema);
// export default User;

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
    inflows: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IncomeExpense",
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