const DBConnect = require("./database");
const router = require("./routes");
const express = require("express");
require("dotenv").config();
// PORT Declaration
const PORT = process.env.PORT || 5000;

const app = express();

// JSON Middleware
app.use(express.json());

// Database Connection
DBConnect();

// Router Declaration
app.use(router);

// Server Listening
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
