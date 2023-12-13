import express from "express";
import { validationMiddleware } from "../../middleware/validation.js";
import { verifyUser } from "../../middleware/verifyUser.js";
import {
  createLibUser,
  loginUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controller/user/user.js";

import {
  createLibUserSchema,
  loginUserSchema,
  getUserSchema,
} from "../controller/user/userSchema.js";
const router = express.Router();
router
  .route("/")
  .get(getUsers)
  .post(validationMiddleware(createLibUserSchema), createLibUser);
router.route("/login").post(validationMiddleware(loginUserSchema), loginUser);

router
  .route("/:id")
  .get(validationMiddleware(getUserSchema, "QUERY"), getUser)
  .patch(verifyUser, updateUser)
  .delete(verifyUser, deleteUser)
export default router