import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
});
