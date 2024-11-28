import Product from "../models/product.js";
import Category from "../models/category.js";

export const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      error: "Error get products",
    });
  }
};

export const getId = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
    const data = await Product.findById(id);
    res.status(200).json({
      data: data,
      message: "success getId",
    });
  } catch (error) {
    res.status(400);
  }
};

export const queryCategory = async (req, res) => {
  try {
    const { categoryId, limit } = req.query;
    console.log("params", categoryId);

    if (!categoryId) {
      return res.status(400).json({ message: "Invalid categoryId format" });
    }
    const data = await Product.find({
      category: categoryId,
    }).limit(limit ? parseInt(limit, 10) : 0);
    console.log(data);

    res.status(200).json({ data });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching category data", error: error.message });
  }
};

export const getProductByCategory = async (req, res) => {
  const { categoryId } = req.query;
  try {
    if (!categoryId) {
      return res.status(400).json({ message: "Invalid categoryId format" });
    }

    const products = await Category.aggregate([
      { $match: { _id: categoryId } },

      {
        $graphLookup: {
          from: "categories",
          startWith: "$_id",
          connectFromField: "_id",
          connectToField: "parentId",
          as: "allCategories",
        },
      },

      {
        $lookup: {
          from: "products",
          localField: "allCategories._id",
          foreignField: "category",
          as: "products",
        },
      },

      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          products: 1,
        },
      },
    ]);

    res.status(200).json(products);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching category data", error: error.message });
  }
};

// const results = await Category.aggregate([
//   // 1. Lọc danh mục gốc
//   { $match: { _id: categoryId } },

//   // 2. Lấy tất cả danh mục con sử dụng $graphLookup
//   {
//     $graphLookup: {
//       from: "categories", // Collection `categories`
//       startWith: "$_id", // Bắt đầu từ danh mục gốc
//       connectFromField: "_id", // Kết nối từ `_id`
//       connectToField: "parentId", // Liên kết qua `parentId`
//       as: "allCategories", // Kết quả lưu trong trường `allCategories`
//     },
//   },

//   // 3. Gộp danh sách tất cả _id của danh mục gốc và các danh mục con
//   {
//     $addFields: {
//       categoryIds: {
//         $concatArrays: [["$_id"], "$allCategories._id"],
//       },
//     },
//   },

//   // 4. Dùng $lookup để kết nối với bảng products
//   {
//     $lookup: {
//       from: "products", // Collection `products`
//       localField: "categoryIds", // So sánh với danh sách `_id` các danh mục
//       foreignField: "category", // Liên kết qua `category` trong bảng products
//       as: "products", // Lưu kết quả sản phẩm vào trường `products`
//     },
//   },

//   // 5. Chỉ giữ lại danh sách sản phẩm
//   {
//     $project: {
//       _id: 0,
//       products: 1,
//     },
//   },
// ]);

// if (results.length === 0) {
//   return res.status(404).json({ message: "No products found" });
// }
// res.status(200).json(results[0].products);
