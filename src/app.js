import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routers/auth.js";
import userRouter from "./routers/user.js";
import productRouter from "./routers/product.js";
import categoryRouter from "./routers/category.js";

const app = express();
const port = 3030;
const endpointDb = "poke-db";

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({
    message: `This is api nodejs using port ${port} !`,
  });
});

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", categoryRouter);

mongoose
  .connect(`mongodb://localhost:27017/${endpointDb}`)
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("not connected");
  });

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/api`);
});
