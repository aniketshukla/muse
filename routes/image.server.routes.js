'use strict';
/**
* Routes for Image functionality
*/
var ImageController = require('./../controllers/image.server.controller');
var UserController = require('./../controllers/user.server.controller');

/**
* @function
* @param server - Restify server
*/
module.exports = function (server) {
  server.get('/convert/image', UserController.verify, ImageController.convert_image);
};
