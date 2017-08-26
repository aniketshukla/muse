var UserController = require('./../controllers/user.server.controller');

module.exports = function (server) {
  server.post('/signin', UserController.sign_in);
};
