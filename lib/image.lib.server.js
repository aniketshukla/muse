'use strict';
/**
*Create Image Object form Image class with @param url
*Image Class is responsible for functionalitites like
*Image creation , conversion and deletion
*/
var gm = require('gm');
var request = require('request');
var fs = require('fs');
var path = require('path');

/** Class -Image.
* @class Image
* @description Handles the Image functionality
*/
class Image {
  /**
  * @description Constructs image Object.
  * @constructor constructor
  * @memberof Image
  * @param {string} url.
  *
  */
  constructor (url) {
    this.url = url;
    this.filename = url.split('/').join('');
    this.path = path.join(__dirname, './../public/' + this.filename);
    this.compressedPath = path.join(__dirname, './../public/compressed/' + this.filename);
  }

  /**
  * @description loads image and saves it to public
  * @function loadImage
  * @memberof Image
  * @param {requestCallback} callback
  */
  loadImage (callback) {
    var writestream = request(this.url).pipe(
                  fs.createWriteStream(this.path));
    writestream.on('error', callback);
    writestream.on('finish', callback);
  }

  /**
  * @description converts image to 50 * 50 and writes it to public/compressed
  * @function convertImage
  * @memberof Image
  * @param {requestCallback} callback
  */
  convertImage (callback) {
    gm(this.path)
      .resize(50, 50).write(this.compressedPath, callback);
  }

  /**
  * Async function - this runs parallel and does not ensure deletion
  * because the message is not captured
  * @description Deletes the file present in public and located on
  * this.path
  * @function end
  * @memberof image
  * @param {requestCallback} callback
  */
  end () {
    fs.unlink(this.path, (err) => {
      if (err) {
        return 1;
      }
    });
  }

}

module.exports = Image;
