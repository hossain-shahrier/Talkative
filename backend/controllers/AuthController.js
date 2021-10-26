// Service
const OtpService = require("../services/OtpService");
class AuthController {
  async sendOTP(req, res) {
    //Logic
    const { phone } = req.body;
    // Phone number validation
    if (!phone) {
      res.status(400).json({ message: "Phone number is required " });
    }
    // Random OTP generate using OTP Service
    const otp = await OtpService.generateOTP();

    res.json({ otp: otp });
  }
}
module.exports = new AuthController();
