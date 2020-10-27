const UserDao = require("../database/UserDao");
const { InvalidArgumentError } = require("../Erros/Erros");

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
  }

  async setUser() {
    if (await User.searchByEmail(`'${this.email}'`)) {
      throw new InvalidArgumentError('This email is invalid or is already in use!');
    }
    await UserDao.addUser(this);
  }

  static async getAll() {
    return await UserDao.getAllUser();
  };

  static async searchById(id) {
    const user = await UserDao.getUserById(id);
    if (user.length === 0) {
      return null
    }
    return user[0];
  };

  static async searchByEmail(email) {
    const user = await UserDao.getUserByEmail(email);
    if (user.length === 0) {
      return null
    }
    return user[0]
  };

  static async delete(id) {
    return UserDao.deleteUser(id);
  };
}
module.exports = User;