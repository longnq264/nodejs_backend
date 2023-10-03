import Joi from "joi";

export const signupSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Trường name là bắt buộc",
        "string.empty": "Trường name không đc để trống",
    }),
    email: Joi.string().required().messages({
        "string.email": "Email không hợp lệ",
        "any.required": "Trường email là bắt buộc",
        "string.empty": "Trường email không được để trống",
    }),
    password: Joi.string().required().min(6).messages({
        "string.min": "Mật khẩu phải có ít nhất {#} ký tự",
        "any.required": "Trường password là bắt buộc",
        "string.empty": "Trường password không được để trống",
    }),
    confirmpassword: Joi.string().required().messages({
        "any.required": "Trường confirmpassword là bắt buộc",
        "string.empty": "Trường confirmpassword không được để trống",
        "any.only": "Mật khẩu không khớp",
    }),
});
export const signinSchema = Joi.object({
    email: Joi.string().required().messages({
        "string.email": "Email không hợp lệ",
        "any.required": "Trường email là bắt buộc",
        "string.empty": "Trường email không được để trống",
    }),
    password: Joi.string().required().min(6).messages({
        "string.min": "Mật khẩu phải có ít nhất {#} ký tự",
        "any.required": "Trường password là bắt buộc",
        "string.empty": "Trường password không được để trống",
    }),
});
