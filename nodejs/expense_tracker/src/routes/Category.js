import express from "express";
import { verifyUser } from "../middleware/verifyUser.js";
import {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category/category.js";
import { createCategorySchema } from "../controllers/category/categorySchema.js";
const router = express.Router();
import { validationMiddleware } from "../middleware/validation.js";

router
  .route("/")
  .get(verifyUser, getCategories)
  .post(validationMiddleware(createCategorySchema), verifyUser, createCategory);

router
  .route("/:categoryId")
  .get(getCategory)
  .patch(validationMiddleware(createCategorySchema), updateCategory)
  .delete(deleteCategory);

export default router;
