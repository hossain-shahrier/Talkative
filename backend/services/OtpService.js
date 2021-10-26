const crypto = require("crypto");
const {
  PhoneNumberContext,
} = require("twilio/lib/rest/lookups/v1/phoneNumber");

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
      body: `Your OTP Number is ${otp}`,
    });
  }

  verifyOtp() {}
}

module.exports = new OTPService();
