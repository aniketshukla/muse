var should = require('chai').should();
var Image = require('./../lib/image.lib.server');

var newImageLink = 'https://images.pexels.com/photos/37728/pexels-photo-37728.jpeg';

describe('Image', function () {
  this.timeout(50000);
  describe('#loadImage', function () {
    it('should load the user image in public/compressed', function (done) {
      var newImage = new Image(newImageLink);
      newImage.loadImage(function (err) {
        should.not.exist(err);
        newImage.end();
        done(err);
      });
    });
  });
});

describe('Image', function () {
  this.timeout(1000000);
  describe('#convertImage', function () {
    it('should load the user image in public/compressed', function (done) {
      var newImage = new Image(newImageLink);
      newImage.loadImage(function (err) {
        should.not.exist(err);
        newImage.convertImage(function (err) {
          should.not.exist(err);
          newImage.end();
          done(err);
        });
      });
    });
  });
});
