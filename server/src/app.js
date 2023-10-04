import express from "express";
import cors from "cors";
import indexRoute from "./routes/index.routes.js";
import videoRoute from "./routes/videos.routes.js";
// require("dotenv").config({ path: `${__dirname}/../.env` });
// const swaggerUi = require("swagger-ui-express");
// const swaggerApiDoc = require("./config/swagger.json");
// const { sequelize } = require("./models");
// sequelize.sync({ alter: true });
// const config = require("./config/environments");

// const indexRouter = require("./routes");
// const globalErrorHandler = require("./helpers/globalErrorHandler");
// const noFoundError = require("./helpers/notFoundError");

const app = express();
app.use(cors());
// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", indexRoute);
app.use("/api/v1", videoRoute);
// app.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerApiDoc));

// app.use(noFoundError);
// app.use(globalErrorHandler);
// app.listen({ port: config.app.port }, async () => {
//   console.info(`listening on port ${config.app.port}`);
// });

app.listen(8000, async () => {
  console.info(`listening on port 8000`);
});

export default app;
