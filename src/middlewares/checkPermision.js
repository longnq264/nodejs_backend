import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user";
dotenv.config();

export const checkPermission = async (req, res, next) => {
    try {
        const requestHeader = req.headers.authorization;
        const token = requestHeader && requestHeader.split(" ")[1];
        console.log("token", token);
        if (!token) {
            return res.status(401).json({
                message: "Bạn chưa đăng nhập",
            });
        }
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        console.log(id);
        const user = await User.findById(id);
        console.log(user);
        if (user.role !== "admin") {
            return res.status(401).json({
                message: "Bạn không có quyền truy cập tài nguyên",
            });
        }
        req.user = user;
        next();
    } catch (error) {
        return res
            .send({
                message: error.message,
            })
            .status(400);
    }
};
