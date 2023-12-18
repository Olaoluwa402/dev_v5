import Joi from "joi";

export const incomeExpenseSchema = Joi.object({
  amount: Joi.number().required(),
  type: Joi.string().valid("income", "expense").required(),
  desc: Joi.string().required(),
  categoryId: Joi.string().required(),
});
