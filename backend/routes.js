// Initializing Router from Express
const router = require("express").Router();
// Controllers
const AuthController = require("./controllers/AuthController");
//Routes
router.post("/api/send-otp", AuthController.sendOTP);

module.exports = router;
