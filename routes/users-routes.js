const UserController = require("../controller/UserController");
const Users = require("../models/Users");

module.exports = app => {
  app.post('/users', UserController.add);

  app.get('/users', UserController.getAll);

  app.get('/users/:id', UserController.getById);

  app.get('/users/email/:email', UserController.getByEmail);

  app.delete('/users/delete/:id', UserController.deleteUser);
}