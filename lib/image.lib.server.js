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
var imageQueryParser = require('./queryParser.lib.server');
var archiver = require('archiver');
var archive = archiver('zip', {
  zlib: { level: 1 }
});

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
  constructor (url, token) {
    token = token === undefined ? '' : token;
    this.url = url;
    this.filename = url.split('/');
    this.filename = this.filename[this.filename.length - 1];
    this.tokenPath = path.join(__dirname, './../public/', token);
    // will be created once per session
    // constructor cannot be asynchronous
    // hence this will always run in the main thread
    if (fs.existsSync(this.tokenPath) === false) {
      fs.mkdirSync(this.tokenPath);
    }
    this.path = path.join(this.tokenPath, this.filename);
    this.compressedPath = path.join(this.tokenPath, '/compressed/');
  }

  __init__ (query, callback) {
    fs.access(this.tokenPath, (err) => {
      if (err.code === 'ENOENT') {
        fs.mkdir(this.tokenPath, (err) => {
          if (err) {
            return callback(err);
          } else {
            this.validateSourceAndDownload(query, callback);
          }
        });
      } else if (err) {
        callback(err);
      } else {
        this.validateSourceAndDownload(query, callback);
      }
    });
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
  * @function saveImage
  * @memberof Image
  * @param {requestCallback} callback - (err)
  * @description writes binary data to file
  * @instance
  */
  saveImage (blob, callback) {
    fs.writeFile(this.path, blob, 'binary', (err) => {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  }

  /**
  * @function validateSource
  * @memberof Image
  * @param {requestCallback} callback - (err)
  * @description loads image and saves it to public
  * @instance
  */
  validateSourceAndDownload (query, callback) {
    request.get(this.url, (errImage, resImage) => {
      if (errImage) {
        callback(errImage);
      } else {
        if (resImage.headers['content-type'].startsWith('application') === false) {
          return this.loadImage(callback);
        } else {
          try {
            resImage.body = JSON.parse(resImage.body);
            var param = imageQueryParser(resImage.body, query);
            this.tokenPath = path.join(this.tokenPath, '/' + param);
            this.url = resImage.body.url;
            this.filename = this.url.split('/');
            this.filename = this.filename[this.filename.length - 1];
            this.path = path.join(this.tokenPath, this.filename);
            this.__init__(query, callback);
          } catch (err) {
            return callback(err);
          }
        }
      }
    });
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

  /**
  * Async function - this runs parallel and does not ensure deletion
  * because the message is not captured
  * this.path
  * @function zip
  * @memberof Image
  * @param {requestCallback} callback
  * @description Zips all the files
  * @instance
  */
  zip (callback) {
    let output = fs.createWriteStream(this.tokenPath + '.zip');
    archive.pipe(output);
    archive.directory(this.tokenPath, false).finalize();
    return this.tokenPath + '.zip';
  }
}

module.exports = Image;
