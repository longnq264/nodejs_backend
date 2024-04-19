import User from "../models/user";
import { signinSchema, signupSchema } from "../schemas/user";
import bcript from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
// dang ky
export const signup = async (req, res) => {
  try {
    const body = req.body;
    const { error } = signupSchema.validate(body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }
    //kiểm tra emai đã có chưa
    const userExist = await User.findOne({ email: body.email });
    if (userExist) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }
    //Mã hóa mật khẩu
    const hashedpassword = await bcript.hash(body.password, 10);
    if (!hashedpassword) {
      return res.status(400).json({
        message: "Sai mật khẩu",
      });
    }
    const user = await User.create({
      name: body.name,
      email: body.email,
      password: hashedpassword,
    });
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1m",
    });
    return res.status(200).json({
      message: "Đăng ký thành công",
      accessToken: token,
      user: user,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
//dang nhap
export const signin = async (req, res) => {
  try {
    const body = req.body;
    const { error } = signinSchema.validate(body, { abortEarly: false });
    if (error) {
      return res.status(400).send({
        message: error.details.map((err) => err.message),
      });
    }
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return res.status(400).send({
        message: "Tai khoan khong ton tai",
      });
    }
    const isMatch = await bcript.compare(body.password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        message: "Mat khau sai",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    return res.status(200).send({
      message: "Đăng nhập thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
    res.status(400).send({
      message: "Loi dang nhap",
    });
  }
};

export const logout = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  } catch (error) {}
};
