// routes/index.js and users.js
import express from "express";
const router = express.Router();
router.get("/", function (req, res) {
  res.status(200).json({ message: "Welcome to the VideoBuzz API" });
});

export default router;
