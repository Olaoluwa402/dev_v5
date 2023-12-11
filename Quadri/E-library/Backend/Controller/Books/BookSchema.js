import joi from "joi";

export const bookSchema = joi.object({
    title: joi.string().required(),
    author: joi.string().required(),
    isbn:joi.string().required(),
    publicationYear:joi.number().required(),
<<<<<<< HEAD
    In_Stock:joi.number().required(),
    categoryId:joi.string().required(),
    coverImage:joi.string().required()
=======
    In_Stock:joi.number().required()
>>>>>>> 96ce3306fc40d6631d282cb4da188104e6032160
})