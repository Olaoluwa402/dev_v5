import Joi from "joi"

export const createUserSchema = Joi.object({
    username: Joi.string().min(7).max(12).required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("regular", "admin", "librarian").optional(),
})

export const loginUserSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})

export const getUserSchema = Joi.object({
    type: Joi.string().valid("ID", "EMAIL", "USERNAME").required(),
    username: Joi.string().optional(),
    email: Joi.string().optional(),
})