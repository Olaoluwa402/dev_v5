import joi from "joi";

export const incomeExpenseSchema = joi.object({
  amount: joi.number().required(),
  type: joi.string().valid("income", "expense").required(),
  desc: joi.string().required(),
  categoryId: joi.string().required(),
});
