import Joi from "joi";

export const categorySchema = Joi.object({
  name: Joi.string().min(3).max(30).required(), // Tên danh mục từ 3-30 ký tự
  parentId: Joi.string().allow(null).optional(), // parentId có thể là string hoặc null
  slug: Joi.string().optional(), // Không bắt buộc
});

// categorySchema.pre("save", function (next) {
//   if (this.name) {
//     // Tạo slug từ name
//     this.slug = this.name
//       .toLowerCase() // Chuyển thành chữ thường
//       .replace(/\s+/g, "-") // Thay thế khoảng trắng thành dấu -
//       .replace(/[^\w\-]+/g, "") // Loại bỏ các ký tự không phải chữ cái hoặc dấu gạch nối
//       .replace(/\-\-+/g, "-") // Loại bỏ dấu gạch nối liên tiếp
//       .replace(/^-+/, "") // Loại bỏ dấu gạch nối ở đầu
//       .replace(/-+$/, ""); // Loại bỏ dấu gạch nối ở cuối
//   }

//   next();
// });

// const categorySchema = mongoose.model("Category", category);

// export default categorySchema;
