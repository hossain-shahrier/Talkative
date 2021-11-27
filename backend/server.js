const DBConnect = require("./database");
const router = require("./routes");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
require("dotenv").config();
// PORT Declaration
const PORT = process.env.PORT || 5000;

const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));
// JSON Middleware
app.use(express.json());
// Database Connection
DBConnect();

// Router Declaration
app.use(router);

// Server Listening
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
