// Service
const HashService = require("../services/HashService");
const OtpService = require("../services/OtpService");
const TokenService = require("../services/TokenService");
const UserService = require("../services/UserService");
// Dtos
const UserDtos = require("../dtos/UserDtos");
class AuthController {
  async sendOTP(req, res) {
    //Logic
    const { phone } = req.body;
    if (!phone) {
      res.status(400).json({ message: "Phone number required" });
    } else {
      let user;
      try {
        // check if user exists
        user = await UserService.findUser({ phone });
        if (!user) {
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
        } else {
          return res.status(400).send({ message: "User already registered" });
        }
      } catch (error) {
        return res.status(500).json({
          message: "Database error",
          error: error.message,
        });
      }
    }
  }
  async verifyOTP(req, res) {
    const { otp, hash, phone, username, email, password } = req.body;
    if (!otp || !hash || !phone) {
      res.status(400).json({ message: "All fields required." });
    }
    const [hashedOTP, expires] = hash.split(".");
    if (Date.now() > +expires) {
      res.status(400).json({ message: "Sorry, This OTP is Expired." });
    } else {
      const data = `${phone}.${otp}.${expires}`;
      const isValid = OtpService.verifyOtp(hashedOTP, data);
      if (!isValid) {
        res.status(400).json({ message: "Invalid OTP Number!" });
      } else {
        // Database Service
        try {
          UserService.createUser({
            username,
            email,
            password,
            phone,
          }).then((user) => {
            const { accessToken, refreshToken } = TokenService.generateTokens({
              _id: user._id,
              activated: false,
            });

            TokenService.storeRefreshToken(refreshToken, user._id);
            res.cookie("refreshToken", refreshToken, {
              maxAge: 1000 * 60 * 60 * 24 * 30,
              httpOnly: true,
            });
            res.cookie("accessToken", accessToken, {
              maxAge: 1000 * 60 * 60 * 24 * 30,
              httpOnly: true,
            });
            const userDtos = new UserDtos(user);
            res.json({ user: userDtos, auth: true });
          });
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: "Database error" });
        }
      }
    }
  }
  async register(req, res) {
    const { username, email, password, phone } = req.body;
    if (!username || !email || !password || !phone) {
      res.status(400).json({ message: "All fields required" });
    }
    let user;
    try {
      user = await UserService.findUser({ phone });
      if (!user) {
        user = UserService.createUser({ username, email, password, phone });
        res.status(200).json({
          message: "User registered",
          user: { username, email, password, phone },
        });
      } else {
        res.status(400).json({ message: "User already registered" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Database error" });
    }
  }
  async refresh(req, res) {
    // get refresh token from cookie
    const { refreshToken: refreshTokenFromCookie } = req.cookies;

    // Check if refresh token is valid
    let userData;
    try {
      userData = await TokenService.verifyRefreshToken(refreshTokenFromCookie);
    } catch (err) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Check if token is in database
    try {
      const token = TokenService.findRefreshToken(
        userData._id,
        refreshTokenFromCookie
      );
      if (!token) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal error" });
    }
    // Check if valid user
    const user = await UserService.findUser({ _id: userData._id });
    if (!user) {
      return res.status(404).json({ message: "No user available" });
    }
    // Generate new tokens
    const { refreshToken, accessToken } = TokenService.generateTokens({
      _id: userData._id,
      activated: false,
    });
    // Update refresh token in database
    try {
      await TokenService.updateRefreshToken(userData._id, refreshToken);
    } catch (err) {
      return res.status(500).json({ message: "Internal error" });
    }
    // Put in cooke
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    // response
    const userDtos = new UserDtos(user);
    res.json({ user: userDtos, auth: true });
  }
}
module.exports = new AuthController();
