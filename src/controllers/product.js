import Product from "../models/product.js";

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
    const { categoryId } = req.query;
    console.log("params", categoryId);
    const data = await Product.find({
      category: categoryId,
    });
    console.log("[data]", data);
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
  }
};
