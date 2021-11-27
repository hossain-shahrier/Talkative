const jwt = require("jsonwebtoken");
const refreshModel = require("../models/refresh-model");
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
class TokenService {
  // Generate Access and Refresh Token
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "1y",
    });
    return { accessToken, refreshToken };
  }
  async storeRefreshToken(token, userId) {
    await refreshModel.create({
      token,
      userId,
    });
  }
  async verifyAccessToken(token) {
    return jwt.verify(token, accessTokenSecret);
  }
  async verifyRefreshToken(token) {
    return jwt.verify(token, refreshTokenSecret);
  }
  async findRefreshToken(userId, refreshToken) {
    return await refreshModel.findOne({
      where: {
        userId: userId,
        token: refreshToken,
      },
    });
  }
  async updateRefreshToken(userId, refreshToken) {
    await refreshModel.updateOne({ userId }, { token: refreshToken });
  }
}
module.exports = new TokenService();
