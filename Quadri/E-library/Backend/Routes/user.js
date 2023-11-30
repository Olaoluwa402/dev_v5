import express from "express";
import validateMiddle from "../Middleware/Validation.js";
import { userSchema } from "../Controller/User/UserSchema.js";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  loginUser,
  updateUser,
} from "../Controller/User/User.js";
import { Authorized, userVerification } from "../Middleware/Auth.js";

const userRouter = express.Router();

userRouter
  .route("/")
  .post(validateMiddle(userSchema), createUser)
  .get(getUsers);

userRouter
  .route("/:id")
  .get(userVerification, Authorized(["regular", "admin"]), getUser)
  .patch(userVerification, Authorized(["regular", "admin"]), updateUser)
  .delete(userVerification, Authorized(["regular", "admin"]),deleteUser);

userRouter.route("/login").post(loginUser);

export default userRouter;
