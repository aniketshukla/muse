'use strict';
var jwt = require('./../node_modules/jsonwebtoken');
var secret = process.env['secret'] || 'aniket';
/**
*Create User Object form User class with @param username @param password
*User Class is responsible for all User functionalitites
*/

/** Class -User.
* @class User
* @description Handles the User functionality
*/
class User {
  /**
  * @memberof User
  * @constructor constructor.
  * @param {string} username.
  * @param {string} password.
  * @description Constructs User Object.
  */
  constructor (username, password) {
    this.username = username;
    this.password = password;
    this.payload = {
      username: this.username
    };
  }

  /**
  * @method
  * @function Token - getter function
  * @memberof User
  * @return {string} JWT signed token
  * @description getter - gets token
  * @instance
  */
  get Token () {
    return jwt.sign(this.payload, secret, {issuer: 'muse'});
  }

  /**
  * @function verifyToken
  * @memberof User
  * @param {string} token - JWT token
  * @param {requestCallback} callback - (err,decoded)
  * @description verifies token
  */
  static verifyToken (token, callback) {
    return jwt.verify(token, secret, {issuer: 'muse'}, callback);
  }

}

module.exports = User;
