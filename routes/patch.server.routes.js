var PatchController = require('./../controllers/json_patch.server.controller');
var UserController = require('./../controllers/user.server.controller');

module.exports = function (server) {
  server.patch('/patch/json', UserController.verify, PatchController.patch_json);
};
