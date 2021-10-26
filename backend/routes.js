const router = require("express").Router();
const AuthController = require("./controllers/AuthController");
router.post("/api/send-otp", AuthController.sendOTP);

module.exports = router;
