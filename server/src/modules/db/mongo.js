const { MongoClient } = require("mongodb");

let _db = null;

const connect = async () => {
  const client = new MongoClient("mongodb://localhost:27017", {
    useNewUrlParser: true,
  });
  await client.connect();
  _db = client.db("videodb");
  console.log("connected to MongoDB".green);
  return _db;
};

const getDb = () => {
  return _db;
};

module.exports = {
  connect,
  getDb,
};
