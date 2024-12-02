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

export const uploadAvatar = async (req, res) => {
  const data = req.file;
  const { userId } = req.query;
  console.log("userId", userId);
  if (!userId) {
    return res.status(400).json({ message: "User ID is required in query" });
  }

  console.log("data", data);
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: data.path },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "Avatar updated successfully",
      data: user,
      avatar: `${user.avatar}`,
    });
  } catch (error) {
    res.status(400).json({ message: "Update error" });
  }
};
