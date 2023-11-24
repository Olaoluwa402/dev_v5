import express from "express";
import { createUserSchema } from "../controllers/user/userSchema.js";
import { validationMiddleware } from "../../middleware/validation.js";
const router = express.Router();
import { createUser, loginUser } from "../controllers/user/user.js";

router.route("/").post(validationMiddleware(createUserSchema), createUser);
router.route("/login").post(loginUser);

export default router;
