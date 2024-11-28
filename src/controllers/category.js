import Category from "../models/category.js";

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
