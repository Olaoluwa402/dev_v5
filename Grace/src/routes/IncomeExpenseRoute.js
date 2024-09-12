import express from "express";
import {
  createIncomeExpense,
  deleteIncomeExpense,
  getAllIncomeExpense,
  getIncomeExpense,
  updatedIncomeExpense,
} from "../controller/incomeExpenses/incomeExpenses.js";
import { verifyUser } from "../middleware/verifyUser.js";
import { validationMiddleware } from "../middleware/validation.js";
import { incomeExpenseSchema } from "../controller/incomeExpenses/incomeSchema.js";
import { authorizeUser } from "../middleware/authorizeUser.js";
const router = express.Router();
router
  .route("/")
  .post(
    validationMiddleware(incomeExpenseSchema),
    verifyUser,
    createIncomeExpense
  )
  .get(verifyUser, getAllIncomeExpense);
router
  .route("/:incomeExpenseId")
  .get(getIncomeExpense)
  .patch(validationMiddleware(incomeExpenseSchema), updatedIncomeExpense)
  .delete(verifyUser, authorizeUser(["regular", "admin"]), deleteIncomeExpense);
export default router;
