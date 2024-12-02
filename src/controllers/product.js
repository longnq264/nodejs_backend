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

export const getDisscounted = async (req, res) => {
  const { limit } = req.query;

  try {
    const data = await Product.find({
      isDiscounted: true,
    }).limit(limit ? parseInt(limit, 10) : 0);
    console.log(data);

    res.status(200).json({ data });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching category data", error: error.message });
  }
};

export const queryCategory = async (req, res) => {
  try {
    const { categoryId, limit } = req.query;
    console.log("params", categoryId);

    if (!categoryId) {
      return res.status(400).json({ message: "Invalid categoryId format" });
    }

    const catSlug = await Category.findById(categoryId);
    if (!catSlug) {
      return res.status(400).json({
        message: "Category notfound",
      });
    }
    let products = [];

    if (catSlug.parentId === null) {
      products = await Product.find({
        category: { $in: catSlug.children },
      }).populate("category", "name");
      console.log(products);
    } else {
      products = await Product.find({
        category: categoryId,
      }).limit(limit ? parseInt(limit, 10) : 0);
      console.log(products);
    }

    res.status(200).json({ data: products, category: catSlug });
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
