import joi from "joi";

export const bookSchema = joi.object({
    title: joi.string().required(),
    author: joi.string().required(),
    isbn:joi.string().required(),
    publicationYear:joi.number().required(),
    In_Stock:joi.number().required(),
    categoryId:joi.string().required(),
    coverImage:joi.string().required()
})