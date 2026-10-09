import Joi from "joi";

const createBook = Joi.object({
    title: Joi.string().trim().required(),

    author: Joi.string().trim().required(),

    isbn: Joi.string()
        .trim()
        .replace(/[\s-]/g, "")
        .uppercase()
        .pattern(/^(?:\d{9}[\dX]|\d{13})$/)
        .required(),

    genre: Joi.string().trim().required(),

    description: Joi.string().allow(""),

    totalCopies: Joi.number()
        .integer()
        .min(0)
        .required()
});


const updateBook = Joi.object({
    title: Joi.string().trim(),

    author: Joi.string().trim(),

    isbn: Joi.string()
        .trim()
        .replace(/[\s-]/g, "")
        .uppercase()
        .pattern(/^(?:\d{9}[\dX]|\d{13})$/),

    genre: Joi.string().trim(),

    description: Joi.string().allow(""),

    totalCopies: Joi.number()
        .integer()
        .min(0)
});


const bookId = Joi.object({
    id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
});


export default {
    createBook,
    updateBook,
    bookId
};