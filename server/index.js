import express from "express";
import multer from "multer";

const app = express();
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), uploadFiles);

function uploadFiles(req, res) {
  console.log(req.body);
  console.log(req.file);
  res.json({ message: "Successfully uploaded file" });
}

const port = 8000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
