import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        price: {
            type: String,
        },
        categoryId: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
        },
    },
    { timestamps: true, versionKey: false }
);

productSchema.plugin(mongoosePaginate);
export default mongoose.model("Product", productSchema);
