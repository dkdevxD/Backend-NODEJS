const conn = require('./conn.js');
const { InternalServerError } = require('../Erros/Erros.js');

const { promisify } = require('util');
const connAsync = promisify(conn.query).bind(conn);

class UserDao {

  static async addUser(user) {
    try {
      await connAsync(
        `INSERT INTO tbl_users (name, email, password) VALUES (?,?,?)`,
        [user.name, user.email, user.password],
      );
    } catch (error) {
      throw new InternalServerError('Error when adding a new user!')
    }
  };

  static async getAllUser() {
    try {
      return await connAsync('SELECT * FROM tbl_users');
    } catch (error) {
      throw new InternalServerError('It was not possible to list all users!');
    }
  }

  static async getUserById(id) {
    try {
      return await connAsync(`SELECT * FROM tbl_users WHERE id=${id}`);
    } catch (error) {
      throw new InternalServerError('User not found!');
    }
  }

  static async getUserByEmail(email) {
    try {
      return await connAsync(`SELECT * FROM tbl_users WHERE email=${email}`);

    } catch (error) {
      throw new InternalServerError('The user was not found or e-mail is invalid or nonexistent!');
    }
  }

  static async deleteUser(id) {
    try {
      await connAsync(`DELETE FROM tbl_users WHERE id=${id}`);
    } catch (error) {
      throw new InternalServerError('Error deleting user!');
    }
  }
}
module.exports = UserDao;