const UserModel = require("../models/UserModel");

class UserService {
  // Find User
  async findUser(filter) {
    const user = await UserModel.findOne(filter);
    return user;
  }
  //   Create User
  async createUser(data) {
    const user = await UserModel.create(data);
    return user;
  }
}
module.exports = new UserService();
