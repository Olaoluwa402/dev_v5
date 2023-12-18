import express from "express";
import {
  createIncomeExpense,
  getAllIncomeExpenses,
  getIncomeExpense,
  updateIncomeExpense,
  deleteIncomeExpense,
} from "../controllers/IncomeExpense/IncomeExpense.js";
import { incomeExpenseSchema } from "../controllers/IncomeExpense/incomeExpenseSchema.js";
import { validationMiddleware } from "../middleware/validation.js";
import { verifyUser } from "../middleware/verifyUser.js";
import { authorizeUser } from "../middleware/authorizeUser.js";
const router = express.Router();

router
  .route("/")
  .get(verifyUser, getAllIncomeExpenses)
  .post(
    validationMiddleware(incomeExpenseSchema),
    verifyUser,
    createIncomeExpense
  );

router
  .route("/:incomeExpenseId")
  .get(getIncomeExpense)
  .patch(validationMiddleware(incomeExpenseSchema), updateIncomeExpense)
  .delete(verifyUser, authorizeUser(["regular", "admin"]), deleteIncomeExpense);

export default router;
