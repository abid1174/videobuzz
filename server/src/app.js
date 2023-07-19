var colors = require("colors");
const express = require("express");
const compression = require("compression");
const cors = require("cors");
const app = express();
colors.enable();

app.use(express.json());
app.use(compression());
app.use(cors());

module.exports = app;
