import express from "express";
const router = express.Router();
import { validationMiddleware } from "../middleware/validation.js";
import { verifyUser } from "../middleware/verifyUser.js";
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
  userProfileUpload,
} from "../controllers/user/user.js";
import { upload } from "../util/multer.js";

router
  .route("/")
  .get(getUsers)
  .post(validationMiddleware(createUserSchema), createUser);
router.route("/login").post(validationMiddleware(loginUserSchema), loginUser);
router
  .route("/upload-profile")
  .patch(verifyUser, upload.single("avatar"), userProfileUpload);
router
  .route("/:id")
  .get(validationMiddleware(getUserSchema, "QUERY"), getUser)
  .patch(verifyUser, updateUser) //protected route
  .delete(verifyUser, deleteUser); //protected route

export default router;
