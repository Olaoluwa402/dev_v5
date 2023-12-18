import Joi from "joi";

export const createUserSchema = Joi.object({
  username: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("regular", "admin").optional(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const getUserSchema = Joi.object({
  type: Joi.string().valid("ID", "EMAIL", "USERNAME").required(),
  username: Joi.when("type", {
    is: "USERNAME",
    then: Joi.string().required(),
    otherwise: Joi.string().optional(), // Otherwise, it's optional
  }),
  id: Joi.when("type", {
    is: "ID",
    then: Joi.string().required(),
    otherwise: Joi.string().optional(), // Otherwise, it's optional
  }),
  email: Joi.when("type", {
    is: "EMAIL",
    then: Joi.string().required(),
    otherwise: Joi.string().optional(), // Otherwise, it's optional
  }),
});
