'use strict';
var jwt = require('./../node_modules/jsonwebtoken');
var secret = 'aniket';
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
  * @description Constructs User Object.
  * @memberof User
  * @constructor constructor.
  * @param {string} username.
  * @param {string} password.
  */
  constructor (username, password) {
    this.username = username;
    this.password = password;
    this.payload = {
      username: this.username
    };
  }

  /**
  * @description getter - gets token
  * @function Token - getter function
  * @memberof User
  * @return {string} JWT signed token
  */
  get Token () {
    return jwt.sign(this.payload, secret, {issuer: 'muse'});
  }

  /**
  * @function verifyToken
  * @memberof User
  * @param {string} token
  * @param {requestCallback} callback
  * @static
  */
  static verifyToken (token, callback) {
    return jwt.verify(token, secret, {issuer: 'muse'}, callback);
  }

}

module.exports = User;
