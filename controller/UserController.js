const User = require('../models/Users.js');
const {InvalidArgumentError} = require('../Erros/Erros.js');

class UserController {

  async add(req, res) {
    const {
      name,
      email,
      password
    } = req.body;
    try {
      const user = new User({
        name,
        email,
        password
      });
      await user.setUser();
      res.status(201).json();
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        return res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };

  async getAll(req, res) {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  async getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const user = await User.searchById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  async getByEmail(req, res) {
    try {
      const { email } = req.params;
      const user = await User.searchByEmail(email);
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  async deleteUser(req, res) {
    try {
      const id = parseInt(req.params.id);
      const user = await User.searchById(id);
      await User.delete(user.id);
      res.status(200).json({ message: 'User deleted successfully!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = new UserController;