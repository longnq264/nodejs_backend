import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  image: { type: String },
  isDiscounted: {
    type: Boolean,
  },
  category: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", productSchema);
