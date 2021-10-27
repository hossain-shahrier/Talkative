const mongoose = require("mongoose");
const DBConnect = () => {
  const DB_URL = process.env.DB_URL;
  // Database Connection
  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Connection error"));
  db.once("open", () => {
    console.log("DB Connected...");
  });
};
module.exports = DBConnect;
