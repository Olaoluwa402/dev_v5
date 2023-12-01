import Joi from "joi"

const pwrgx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
const pwMsg = 'Password must be at least 8 characters long and include at least one letter, one digit, and special characters @$!%*?&'

export const createLibUserSchema = Joi.object({
    userName: Joi.string().min(8).max(12).required(),
    password: Joi.string()
    .pattern(pwrgx)
    .message(pwMsg)
    .required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid("regular", "admin").optional(),
    phonenumber: Joi.number().optional()
})
export const loginUserSchema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().required()
})
export const getUserSchema = Joi.object({
    type: Joi.string().valid("ID", "EMAIL", "USERNAME").required(),
    username: Joi.string().optional(),
    password: Joi.string().optional(),
})