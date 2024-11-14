import Joi from "joi";

const signinSchema = Joi.object({
  email: Joi.string().required().messages({
    "string.email": "Email not corrected",
    "any.required": "Trường email là bắt buộc",
    "string.empty": "Trường email không được để trống",
  }),
  password: Joi.string().required().min(6).messages({
    "string.min": "Mật khẩu phải có ít nhất {#} ký tự",
    "any.required": "Trường password là bắt buộc",
    "string.empty": "Trường password không được để trống",
  }),
});

export default signinSchema;
