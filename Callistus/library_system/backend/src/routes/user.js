import express from "express";
const router = express.Router();

import { validationMiddleware } from "../middleware/validation.js";
import {
  createUserSchema,
  loginUserSchema,
  getUserSchema,
} from "../controllers/Users/userSchema.js";
import {
  createUser,
  loginUser,
  getUsers,
  getUser,
} from "../controllers/Users/user.js";

router
  .route("/")
  .get(getUsers)
  .post(validationMiddleware(createUserSchema), createUser);
router.route("/login").post(validationMiddleware(loginUserSchema), loginUser);
router.route("/:id").get(validationMiddleware(getUserSchema, "QUERY"), getUser);

export default router;
