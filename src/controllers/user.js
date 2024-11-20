import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

export const getUserProfile = async (req, res) => {
  const id = req.user.id;
  try {
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).send({
      message: "Get user success",
      data: user,
    });
  } catch (error) {
    res.status(401).json({ message: "Not token provided" });
  }
};
