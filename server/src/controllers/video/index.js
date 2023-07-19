const BASE_URL = "/api/videos";
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const { addQueueItem } = require("../../modules/queues/queue");
const {
  VIDEO_QUEUE_EVENTS: QUEUE_EVENTS,
} = require("../../modules/queues/constants");

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

const setupVideoController = (app) => {
  const uploadProcessor = (req, res, next) => {
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

  app.post(`/upload`, uploadProcessor, async (req, res) => {
    try {
      console.log("POST upload", JSON.stringify(req.body));
      const dbPayload = {
        ...req.body,
        fileName: req.file.filename,
        originalName: req.file.originalname,
        recordingDate: new Date(),
        videoLink: req.file.path,
      };
      console.log("dbPayload", dbPayload);
      // TODO: save the file info and get the id from the database
      //   const result = await insert(dbPayload);
      //   console.log("result", result);

      await addQueueItem(QUEUE_EVENTS.VIDEO_UPLOADED, {
        // id: result.insertedId.toString(),
        id: uuidv4(),
        ...req.body,
        ...req.file,
      });

      res.status(200).json({
        status: "success",
        message: "Upload success",
        ...req.file,
        // ...result,
      });
      return;
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  });
};
module.exports = { setupVideoController };
