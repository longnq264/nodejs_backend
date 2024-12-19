import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: { type: String },
  role: {
    type: String,
    default: "member",
  },
});

export default mongoose.model("User", userSchema);
