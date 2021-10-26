class AuthController {
  sendOTP(req, res) {
    res.send("Hello from new OTP Route");
  }
}
module.exports = new AuthController();
