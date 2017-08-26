'use strict';
var UserClass = require('./../lib/user.lib.server');

exports.sign_in = function (req, res) {
  if (req.body.username === undefined || req.body.password === undefined) {
    return res.send(200, (
      {'err': 'Missing parameter , please ensure both username and password are supplied'}));
  } else {
    var newUser = new UserClass(req.body.username, req.body.password);
    return res.send(201, {token: newUser.Token});
  }
};

exports.verify = function (req, res, next) {
  var token;
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
    UserClass.verifyToken(token, (err, decoded) => {
      if (err) {
        return res.send(502, (
          {'err': 'Invlaid Token'}));
      } else {
        req.token = decoded;
        next();
      }
    });
  }
};
