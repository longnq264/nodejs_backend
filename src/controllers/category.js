import Category from "../models/category";
import { categorySchema } from "../schemas/category";

export const getAll = async (req, res) => {
    const categories = await Category.find();
    console.log(categories);
    if (Array.isArray(categories)) {
        res.json([...categories]);
    } else {
        res.json([]);
    }
};

export const getID = async (req, res) => {
    try {
        const id = req.params.id;
        const categories = await Category.findById(id).populate("products");
        console.log(categories.products);
        res.status(200).json([categories.products]);
    } catch (error) {
        res.status(400);
    }
};

export const create = async (req, res) => {
    try {
        const body = req.body;
        const { error } = categorySchema.validate(body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(400).send({
                message: error.details.map((err) => err.message),
            });
        } else {
            const category = await Category.create(req.body);
            return res.status(201).json({
                message: "create success",
                data: category,
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
        const body = req.params.body;
        const category = await Category.findByIdAndUpdate(id, body, {
            new: true,
        });
        res.status(200).json({
            message: "update succesfuly",
            data: category,
        });
    } catch (error) {}
};

export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findByIdAndDelete(id);
        res.status(200).json({
            message: "Remove succesfuly",
            data: category,
        });
    } catch (error) {
        return res.status(400).send({
            message: error.message,
        });
    }
};
