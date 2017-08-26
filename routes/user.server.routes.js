'use strict';
/**
* Routes for User functionality
*/

var UserController = require('./../controllers/user.server.controller');

/**
* @function
* @param server - Restify server
*/
module.exports = function (server) {
  server.post('/signin', UserController.sign_in);
};
