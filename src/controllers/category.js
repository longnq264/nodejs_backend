import Category from "../models/category.js";

export const getAll = async (req, res) => {
  try {
    const listCategory = await Category.find();
    console.log("categories", listCategory);

    const nestedCategory = (categories, parentSlug = null) => {
      return listCategory
        .filter((data) => data._doc.parent === parentSlug)
        .map((data) => ({
          ...data._doc,
          children: nestedCategory(categories, data._doc.slug),
        }));
    };
    // console.log(result);

    const menu = nestedCategory(listCategory, null);
    res.json(menu);
  } catch (error) {
    res.status(500).json({
      error: "Error get categories",
    });
  }
};
