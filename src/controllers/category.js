import Category from "../models/category.js";
import { categorySchema } from "../schemas/category.js";

export const getAll = async (req, res) => {
  try {
    const listCategory = await Category.find();

    res.json(listCategory);
  } catch (error) {
    res.status(500).json({
      error: "Error get categories",
    });
  }
};

export const getNested = async (req, res) => {
  try {
    const listCategory = await Category.find();
    console.log("categories", listCategory);

    const nestedCategory = (categories, parentId = null) => {
      return categories
        .filter((data) => {
          if (parentId === null) return data.parentId === null;
          return data.parentId?.toString() === parentId.toString();
        })
        .map((data) => ({
          ...data._doc,
          children: nestedCategory(categories, data._id), // Gọi đệ quy với _id
        }));
    };
    // console.log(result);

    const menu = nestedCategory(listCategory);
    res.json(menu);
  } catch (error) {
    res.status(500).json({
      error: "Error get categories",
    });
  }
};

export const createCategory = async (req, res) => {
  const data = req.body;
  console.log("[creating server]", data);
  try {
    const { value, error } = categorySchema.validate(data, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).send({
        message: error.details,
      });
    }
    const category = await Category.create(value);
    return res.status(201).json({
      message: "Category created",
      category: category,
    });
  } catch (error) {
    console.error("Error creating category", error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, parentId } = req.body;
  console.log(name);
  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name;
    parentId && (category.parentId = parentId);
    await category.save();
    return res.status(200).json({
      message: `update id ${id}`,
      data: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating",
    });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await Category.deleteMany({ parentId: id });
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({
        message: "categories not found",
      });
    }
    return res.status(200).json({
      message: "Delete Success",
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
};
