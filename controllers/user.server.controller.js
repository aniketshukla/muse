'use strict';
var UserClass = require('./../lib/user.lib.server');
/**
* Controller for User
*/

/**
* @description - signs in , returns a token
* @function sign_in - controller
* @param {object} req
* @param {object} res
*/
exports.sign_in = function (req, res, next) {
  if (req.body.username === undefined || req.body.password === undefined) {
    return res.send(400, (
      {'err': 'Missing parameter , please ensure both username and password are supplied'}));
  } else {
    // Creates a UserClass and sends a 201 creation token
    let newUser = new UserClass(req.body.username, req.body.password);
    return res.send(201, {token: newUser.Token});
  }
};

/**
* @description - verifies token
* and passes it on to next controller
* @function verify - controller
* @param {object} req
* @param {object} res
*/
exports.verify = function (req, res, next) {
  var token;
  // The token can be present in following req properties
  // 1)Header - Authorization
  // 2)body.token - Post request
  // 3)query.token - Get request
  if (req.header('Authorization')) {
    token = req.header('Authorization');
  } else if (req.body && req.body.token) {
    token = req.body.token;
  } else if (req.query) {
    token = req.query.token;
  }
  if (token === undefined) {
    return res.send(400, (
      {'err': 'Token not supplied'}));
  } else {
    // verify Token
    UserClass.verifyToken(token, (err, decoded) => {
      if (err) {
        res.send(502, (
          {'err': 'Invlaid Token'}));
        return next(err);
      } else {
        req.token = decoded;
        // next - passes req and res to next controller
        next();
      }
    });
  }
};
