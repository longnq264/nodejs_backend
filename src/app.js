import express from "express";
import mongoose from "mongoose";

import productRouter from "./routers/product";
import categoryRouter from "./routers/categories";
import userRouter from "./routers/user";

import cors from "cors";

const app = express();
//midleware
app.use(express.json());
// cors;
app.use(cors());

app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", userRouter);

mongoose
  .connect("mongodb://localhost:27017/Assignment")
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("not connected");
  });

export const viteNodeApp = app;
