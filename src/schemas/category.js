import Joi from "joi";

export const categorySchema = Joi.object({
    name: Joi.string().required(),
    img: Joi.string().required(),
});
