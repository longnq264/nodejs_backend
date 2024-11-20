import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

export const authenticateToken = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("token middleware", token);
  if (!token) {
    return res.status(400).json({
      message: "Not Token here",
    });
  }
  try {
    const decode = jwt.verify(token, secretKey);
    console.log("decode", decode);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not token provided" });
  }
};
