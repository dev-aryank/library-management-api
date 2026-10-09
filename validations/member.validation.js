import Joi from "joi";

const createMember = Joi.object({
    name: Joi.string()
        .trim()
        .required(),

    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .required(),

    phone: Joi.string()
        .trim()
        .allow("")
});


const updateMember = Joi.object({
    name: Joi.string()
        .trim(),

    email: Joi.string()
        .trim()
        .lowercase()
        .email(),

    phone: Joi.string()
        .trim()
        .allow("")
}).min(1);


const memberId = Joi.object({
    id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
});


export default {
    createMember,
    updateMember,
    memberId
};