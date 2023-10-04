import express from "express";
import { uploadVideo } from "../apps/videos/videos.controller.js";
import { uploadMiddleware } from "../middlewares/index.js";
// import {
//   createEventValidator,
//   updateEventValidator,
//   getEventsValidator,
// } from "../events/events.validator";
// import withErrorHandler from "../helpers/controllerErrorHandler";

const router = express.Router();
router.post("/videos", uploadMiddleware, uploadVideo);

export default router;
