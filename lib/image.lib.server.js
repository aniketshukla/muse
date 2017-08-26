'use strict';
var gm = require('gm');
var request = require('request');
var fs = require('fs');

class Image {
  constructor (url, width, height) {
    this.url = url;
    this.width = width;
    this.height = height;
    this.filename = url.split('/').join('');
    this.path = process.cwd() + '/public/' + this.filename;
    this.compressedPath = process.cwd() + '/public/compressed/' + this.filename;
  }

  loadImage (callback) {
    var writestream = request(this.url).pipe(
                  fs.createWriteStream(process.cwd() + '/public/' + this.filename));
    writestream.on('error', callback);
    writestream.on('finish', callback);
  }

  convertImage (callback) {
    gm(this.path)
      .resize(50, 50).write(this.compressedPath, callback);
  }

  end (callback) {
    fs.unlink(this.path, (err) => {
      if (err) {
        return 1;
      }
    });
  }

}

module.exports = Image;
