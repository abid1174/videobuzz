import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/videos");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "video/mp4" || file.mimetype === "video/webm") {
    console.log("file type supported", file);
    cb(null, true);
  } else {
    console.log("file type not supported", file);
    cb(new multer.MulterError("File type not supported"), false);
  }
};

const upload = multer({
  dest: "uploads/videos",
  fileFilter: fileFilter,
  limits: { fileSize: 50000000 },
  storage: storage,
}).single("video");

const uploadMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      res.status(400).json({ status: "error", error: err });
      return;
    } else {
      console.log("upload success", req.file);
      // res.status(200).json({ status: "success", message: "upload success" });
      next();
    }
  });
};

export default uploadMiddleware;
