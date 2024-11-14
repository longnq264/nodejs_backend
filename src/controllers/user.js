import signinSchema from "../schemas/user.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
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
    const secretKey = process.env.SECRET_KEY;
    const options = { expiresIn: "1m" };

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
