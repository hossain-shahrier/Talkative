class AuthController {
  sendOTP(req, res) {
    //Logic
    const { phone } = req.body;
    if (!phone) {
      res.status(400).json({ message: "Phone number is required " });
    }
    // Random OTP Number
    res.send("Hello from new OTP Route");
  }
}
module.exports = new AuthController();
