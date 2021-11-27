const UserDtos = require("../dtos/UserDtos");
const UserService = require("../services/UserService");

class ActivateController {
  async activate(req, res) {
    const { username, email, phone } = req.body;
    if (!username || !email || !phone) {
      return res.status(400).json({
        status: 400,
        error: "All fields are required",
      });
    }
    try {
      const user = await UserService.findUser({ phone });
      user.activated = true;
      user.save();
      res.json({ user, auth: true });
    } catch (err) {
      res.status(500).json({
        message: "Someting went wrong!",
      });
    }
  }
}

module.exports = new ActivateController();
