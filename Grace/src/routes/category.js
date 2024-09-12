import { verifyUser } from "../middleware/verifyUser.js";
import { validationMiddleware } from "../middleware/validation.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controller/category/category.js";
import { createUserSchema } from "../controller/category/categorySchema.js";
import express from "express";
import { authorizeUser } from "../middleware/authorizeUser.js";
const router = express.Router();
router
  .route("/")
  .get(verifyUser, getCategories)
  .post(validationMiddleware(createUserSchema), verifyUser, createCategory);
// you have to authenticate first before authurization

router
  .route("/:categoryId")
  .get(getCategory)
  .patch(validationMiddleware(createUserSchema), updateCategory)
  .delete(verifyUser, authorizeUser(["regular", "admin"]), deleteCategory);

export default router;
