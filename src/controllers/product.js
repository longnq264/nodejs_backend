import Product from "../models/product";
import Category from "../models/category";
import { productSchema } from "../schemas/product";

export const getAll = async (req, res) => {
    const {
        _page = 1,
        _limit = 10,
        _sort = "CreateAt",
        _order = "asc",
    } = req.query;
    const options = {
        page: _page,
        sort: {
            [_sort]: _order === "asc" ? 1 : -1,
        },
        limit: _limit,
    };
    const data = await Product.paginate({}, options);
    const docs = data.docs;
    if (Array.isArray(docs)) {
        res.json([...docs]);
    } else {
        res.json([]);
    }
};

export const getID = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Product.findById(id).populate("categoryId");
        res.status(200).json({
            message: "Get productID",
            data: data,
        });
    } catch (error) {
        res.status(400);
    }
};

export const create = async (req, res) => {
    try {
        const body = req.body;
        const { error } = productSchema.validate(body, { abortEarly: false });
        if (error) {
            return res.status(400).send({
                message: error.details.map((err) => err.message),
            });
        } else {
            const product = await Product.create(body);
            await Category.findByIdAndUpdate(product.categoryId, {
                $addToSet: {
                    products: product._id,
                },
            });
            return res.status(201).json({
                message: "create success",
                product: product,
            });
        }
    } catch (error) {
        return res.status(400).send({
            message: error.message,
        });
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const data = await Product.findByIdAndUpdate(id, body, { new: true });
        console.log(id);
        res.status(200).json({
            message: "update succesfuly",
            data: data,
        });
    } catch (error) {}
};

export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Product.findByIdAndDelete(id);
        res.status(200).json({
            message: "Remove succesfuly",
            data: data,
        });
    } catch (error) {
        return res.status(400).send({
            message: error.message,
        });
    }
};
