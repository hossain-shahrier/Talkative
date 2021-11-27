// Initializing Router from Express
const router = require("express").Router();
const ActivateController = require("./controllers/ActivateController");
// Controllers
const AuthController = require("./controllers/AuthController");
const authMiddleware = require("./middlewares/auth-middleware");
//Routes
router.post("/api/register", AuthController.register);
router.post("/api/send-otp", AuthController.sendOTP);
router.post("/api/verify-otp", AuthController.verifyOTP);
router.post("/api/activate", authMiddleware, ActivateController.activate);
router.get("/api/refresh", AuthController.refresh);

module.exports = router;
// End of file routes.js
