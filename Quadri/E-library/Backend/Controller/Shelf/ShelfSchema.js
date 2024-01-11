import Joi from "joi";

export const addToShelfSchema = Joi.object({
    bookId: Joi.string().required(),
    categoryId:Joi.string().required()
})