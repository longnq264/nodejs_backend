import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

categorySchema.index({ parent: 1, slug: 1 });

export default mongoose.model("Category", categorySchema);
