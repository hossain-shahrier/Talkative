class UserDtos {
  _id;
  phone;
  username;
  activated;
  email;
  createdAt;

  constructor(user) {
    this._id = user._id;
    this.phone = user.phone;
    this.activated = user.activated;
    this.username = user.username;
    this.email = user.email;
    this.createdAt = user.createdAt;
  }
}

module.exports = UserDtos;
