import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
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
    status: {
      type: String,
      enum: ["collection", "sub-category", "hidden"],
      default: "sub-category",
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    // children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }], // Mảng chứa ObjectId của các danh mục con
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

categorySchema.index({ parent: 1, slug: 1 });

export default mongoose.model("Category", categorySchema);
