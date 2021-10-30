// Service
const HashService = require("../services/HashService");
const OtpService = require("../services/OtpService");
const UserService = require("../services/UserService");
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
        otp,
        phone,
      });
    } catch (err) {
      res.status(500).json({ message: "message sending failed" });
    }
    res.json({ hash: hash });
  }
  async verifyOTP(req, res) {
    const { otp, hash, phone, username, email, password } = req.body;
    if (!otp || !hash || !phone || !username || !email || !password) {
      res.status(400).json({ message: "All fields required" });
    }
    const [hashedOTP, expires] = hash.split(".");
    if (Date.now() > +expires) {
      res.status(400).json({ message: "OTP expired" });
    } else {
      const data = `${phone}.${otp}.${expires}`;
      const isValid = OtpService.verifyOtp(hashedOTP, data);
      if (!isValid) {
        res.status(400).json({ message: "Invalid OTP number" });
      } else {
        // Database Service
        let user;
        let accessToken;
        let refreshToken;
        try {
          user = await UserService.findUser({ phone });
          if (!user) {
            user = UserService.createUser({ username, email, password, phone });
            res.status(200).json({ message: "A new user created" });
          } else {
            res.status(400).json({ message: "User already registered" });
          }
        } catch (err) {
          console.log(err);
          res.status(500);
        }
        // Token
      }
    }
  }
}
module.exports = new AuthController();
