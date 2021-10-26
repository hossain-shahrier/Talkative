const crypto = require("crypto");
class OTPService {
  async generateOTP() {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
  }

  sendBySms() {}

  verifyOtp() {}
}

module.exports = new OTPService();
