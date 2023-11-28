import Joi from "joi";

export const createUserSchema = Joi.object({
  username: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("regular", "admin").optional(),
});
<<<<<<< HEAD

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
=======
>>>>>>> ac8a96bbb62fd1aa41c751915566d84a5948a407
