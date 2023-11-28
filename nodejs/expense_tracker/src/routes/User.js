import express from "express";
<<<<<<< HEAD
import {
  createUserSchema,
  loginUserSchema,
} from "../controllers/user/userSchema.js";
import { validationMiddleware } from "../middleware/validation.js";
=======
import { createUserSchema } from "../controllers/user/userSchema.js";
import { validationMiddleware } from "../../middleware/validation.js";
>>>>>>> ac8a96bbb62fd1aa41c751915566d84a5948a407
const router = express.Router();
import { createUser, loginUser } from "../controllers/user/user.js";

router.route("/").post(validationMiddleware(createUserSchema), createUser);
<<<<<<< HEAD
router.route("/login").post(validationMiddleware(loginUserSchema), loginUser);
// router.route("/:id").get(getUser)
=======
router.route("/login").post(loginUser);

>>>>>>> ac8a96bbb62fd1aa41c751915566d84a5948a407
export default router;
