import express from "express";
const router = express.Router();
import { validationMiddleware } from "../middleware/validation.js";
import {
  createUserSchema,
  loginUserSchema,
  getUserSchema,
} from "../controllers/user/userSchema.js";
import {
  createUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user/user.js";

router
  .route("/")
  .get(getUsers)
  .post(validationMiddleware(createUserSchema), createUser);
router.route("/login").post(validationMiddleware(loginUserSchema), loginUser);
router
  .route("/:id")
  .get(validationMiddleware(getUserSchema, "QUERY"), getUser)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
