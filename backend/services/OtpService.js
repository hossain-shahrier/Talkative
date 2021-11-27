const crypto = require("crypto");
const HashService = require("./HashService");
require("dotenv").config();

const smsid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require("twilio")(smsid, smsAuthToken, {
  lazyLoading: true,
});
class OTPService {
  async generateOTP() {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
  }

  async sendBySms(phone, otp) {
    return await twilio.messages.create({
      to: phone,
      from: process.env.SMS_FROM_NUMBER,
      body: `Your Talketive OTP Number is :${otp}`,
    });
  }

  verifyOtp(hashedOTP, data) {
    let computedHash = HashService.hashOTP(data);
    if (computedHash === hashedOTP) {
      return true;
    }
    return false;
  }
}

module.exports = new OTPService();
