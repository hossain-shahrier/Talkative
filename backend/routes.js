// Initializing Router from Express
const router = require("express").Router();
// Controllers
const AuthController = require("./controllers/AuthController");
//Routes
router.post("/api/register", AuthController.register);
router.post("/api/send-otp", AuthController.sendOTP);
router.post("/api/verify-otp", AuthController.verifyOTP);

module.exports = router;
// End of file routes.js
