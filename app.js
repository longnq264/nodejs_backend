import express from "express";
import cors from "cors";
import formidable from "formidable";

const app = express();
const port = 3030;

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.post("/api/upload", (req, res, next) => {
  const form = formidable({});

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ fields, files });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`);
});



const data = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

data.forEach(item => {
  const listItem = item
});