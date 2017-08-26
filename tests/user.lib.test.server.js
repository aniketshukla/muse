var should = require('chai').should();
var User = require('./../lib/user.lib.server');

describe('User', function () {
  describe('#Token', function () {
    it('builds a valid JWT token', function (done) {
      let newUser = new User('Aniket', 'Shukla');
      should.exist(newUser.Token);
      User.verifyToken(newUser.Token, function (err) {
        should.not.exist(err);
        done(err);
      });
    });
  });
});
