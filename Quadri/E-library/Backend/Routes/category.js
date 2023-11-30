import express from "express";
import validateMiddle from "../Middleware/Validation.js";
import { categorySchema } from "../Controller/Category/CategorySchema.js";
import { Authorized, userVerification } from "../Middleware/Auth.js";
import {
  createCategory,
  getCategories,
  getCategory,
} from "../Controller/Category/Category.js";

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(
    validateMiddle(categorySchema),
    userVerification,
    Authorized(["librarian"]),
    createCategory
  )
  .get(getCategories);

categoryRouter
  .route("/:id")
  .get(userVerification, Authorized(["regular", "admin", "librarian"]),getCategory);

export default categoryRouter;
