// Service
const HashService = require("../services/HashService");
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
    // Hashing generated OTP
    const ttl = 1000 * 180;
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;
    const hash = HashService.hashOTP(data);
    // Send OTP
    try {
      await OtpService.sendBySms(phone, otp);
      res.json({
        hash: `${hash}.${expires}`,
        phone,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "message sending failed" });
    }
    res.json({ hash: hash });
  }
}
module.exports = new AuthController();
