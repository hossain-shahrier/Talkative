require("dotenv").config();
const express = require("express");

const app = express();
const router = require("./routes");
// PORT Declaration
const PORT = process.env.PORT || 5000;
// JSON Middleware
app.use(express.json());
// Router Declaration
app.use(router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
