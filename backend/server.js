require("dotenv").config();
const express = require("express");

const app = express();
const router = require("./routes");
const PORT = process.env.PORT || 5000;
app.use(router);
app.get("/", (req, res) => {
  res.send("Hello from express");
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
