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
  * @param {string} url - any valid image url.
  *
  */
  constructor (url) {
    this.url = url;
    this.filename = url.split('/').join('');
    this.path = path.join(__dirname, './../public/' + this.filename);
    this.compressedPath = path.join(__dirname, './../public/compressed/' + this.filename);
  }

  /**
  * @function loadImage
  * @memberof Image
  * @param {requestCallback} callback - (err)
  * @description loads image and saves it to public
  * @instance
  */
  loadImage (callback) {
    var writestream = request(this.url).pipe(
                  fs.createWriteStream(this.path));
    writestream.on('error', callback);
    writestream.on('finish', callback);
  }

  /**
  * @function convertImage
  * @memberof Image
  * @param {requestCallback} callback - (err,info)
  * @description converts image to 50 * 50 and writes it to public/compressed
  * @instance
  */
  convertImage (callback) {
    gm(this.path)
      .resize(50, 50).write(this.compressedPath, callback);
  }

  /**
  * Async function - this runs parallel and does not ensure deletion
  * because the message is not captured
  * this.path
  * @function end
  * @memberof image
  * @param {requestCallback} callback
  * @description Deletes the file present in public and located on
  * @instance
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
