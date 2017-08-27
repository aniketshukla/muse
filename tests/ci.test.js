'use strict';
/**
* Contnious Integration testing
*/

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('./../index.js');
var User = require('./../lib/user.lib.server');
var Token = new User('aniket','shukla').Token;
var invalidToken = Token + 'a';
var jsonObject = {'baz': 'qux',  'foo': 'bar'};

var jsonPatch = [
  {'op': 'replace', 'path': '/baz', 'value': 'boo'},
  {'op': 'add', 'path': '/hello', 'value': ['world']},
  {'op': 'remove', 'path': '/foo'}
];

var jsonResult = {
  'baz': 'boo',
  'hello': ['world']
};

chai.use(chaiHttp);

describe('/signin', function () {
  it('should Signin user', function (done) {
     chai.request(server)
    .post('/signin')
    .send({ username: 'aniket', password: 'shukla' }).then((res) => {
      should.exist(res.body.token);
      done();
    });
  });
});

describe('/patch/json', function () {
  it('should patch json', function (done) {
    chai.request(server)
    .patch('/patch/json')
    .send({json_object: jsonObject, json_patch: jsonPatch, token: Token}).then((res) => {
      res.should.have.status(200);
      res.body.should.deep.equal(jsonResult);
      done();
    });
  });
});

// convert image needs to be manually tested
