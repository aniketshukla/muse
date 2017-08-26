'use strict';
var jwt = require('./../node_modules/jsonwebtoken');
var secret = 'aniket';

class User {
  constructor (username, password) {
    this.username = username;
    this.password = password;
    this.payload = {
      username: this.username
    };
  }

  get Token () {
    return jwt.sign(this.payload, secret, {issuer: 'muse'});
  }

  static verifyToken (token, callback) {
    return jwt.verify(token, secret, {issuer: 'muse'}, callback);
  }

}

module.exports = User;
