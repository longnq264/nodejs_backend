import express from "express";
import cors from "cors";
import formidable from "formidable";
import userRouter from "./routers/user.js";
import mongoose from "mongoose";

const app = express();
const port = 3030;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to backend express!",
  });
});

app.use("/api", userRouter);

app.get("/api/products", (req, res) => {
  res.json({
    message: "Welcome to product api",
  });
});

// app.post("/api/upload", (req, res, next) => {
//   const form = formidable({});

//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       next(err);
//       return;
//     }
//     res.json({ fields, files });
//   });
// });

mongoose
  .connect("mongodb://localhost:27017/poke-db")
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("not connected");
  });

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/api`);
});
