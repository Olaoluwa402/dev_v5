import express from "express";
import {
  createUserSchema,
  loginUserSchema,
  getUserSchema,
} from "../controllers/user/userSchema.js";
import { validationMiddleware } from "../middleware/validation.js";
const router = express.Router();
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
