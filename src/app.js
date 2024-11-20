import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import authRouter from "./routers/auth.js";
import userRouter from "./routers/user.js";

const app = express();
const port = 3030;
const endpointDb = "poke-db";

app.use(cors());

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({
    message: "This is api nodejs !",
  });
});

app.use("/api", authRouter);
app.use("/api", userRouter);

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
