import { signinSchema, signupSchema } from "../schemas/user.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcript from "bcrypt";

dotenv.config();
const secretKey = process.env.SECRET_KEY;
const options = { expiresIn: "1h" };

export const signin = async (req, res) => {
  const body = req.body;
  try {
    const { error } = signinSchema.validate(body, { abortEarly: false });
    if (error) {
      return res.status(400).send({
        message: error,
      });
    }

    const user = await User.findOne({
      email: body.email,
    });

    const passwordUser = body.password;
    const passwordDb = user.password;

    if (!user) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    if (passwordDb !== passwordUser) {
      return res.status(401).json({
        message: "Incorrect password. Please try again.",
      });
    }

    const payload = { id: user.id, username: user.name };
    const token = jwt.sign(payload, secretKey, options);

    res.status(200).send({
      auth: user,
      password: passwordUser,
      message: "Login successful",
      accessToken: token,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const signup = async (req, res) => {
  const body = req.body;
  try {
    const { error } = signupSchema.validate(body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }
    const userExist = await User.findOne({ email: body.email });
    if (userExist) {
      return res.status(400).json({
        message: "Email exits",
      });
    }

    if (body.password !== body.confirmpassword) {
      return res.status(400).json({
        message: "Confirm Password not correct",
      });
    }

    const hashedPassword = await bcript.hash(body.password, 10);

    const user = await User.create({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });

    const payload = { id: user.id };

    const token = jwt.sign(payload, secretKey, options);

    return res.status(200).json({
      message: "Registed!",
      accessToken: token,
      user: user,
    });
  } catch (error) {
    console.error("Error in /register route:", error); // Log lỗi cho developer
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi trên máy chủ, vui lòng thử lại sau." });
  }
};
