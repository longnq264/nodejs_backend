import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  desc: String,
  quantity: Number,
  price: Number,
});

export default mongoose.model("Products", userSchema);
