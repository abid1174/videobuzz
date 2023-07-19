const { connect } = require("./modules/db/mongo");
const { setupAllQueueEvents } = require("./modules/queues/worker");

async function setup() {
  const db = await connect();
  setupAllQueueEvents(db);
}
setup();
