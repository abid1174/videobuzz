const app = require("./app");
const { connect } = require("./modules/db/mongo");

const PORT = 4000;

const setup = async (db) => {
  const { setupVideoController } = await require("./controllers/video");
  setupVideoController(app);
};

const http = require("http");
const server = http.createServer(app);

server.listen(PORT, async () => {
  console.log(`listening on port ${PORT}`.blue);
  const db = await connect();
  await setup(db);
  console.log("application setup completed");

  // app.use("/", (req, res) => {
  //   console.log(`request received at ${new Date()}`);
  //   console.log("req", req.body);
  //   res.send(`request received at ${new Date()}`);
  // });

  console.log("application started", new Date().toTimeString());
});
