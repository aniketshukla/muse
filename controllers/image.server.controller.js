'use strict';
/**
*Controllers for Image functionality
*/
var Image = require('./../lib/image.lib.server');
var queryParser = require('./../lib/queryParser.lib.server');

/**
* @description - converts images , requires req.body.url
* names the compressed image by replacing the '/' by ''
* @function convert_image - controller
* @param {object} req
* @param {object} res
*/
exports.convert_image = function (req, res, next) {
  if (req.query.url === undefined) {
    // url should be defined
    return res.send(400, {err: 'Invalid parameter , url is not defined'});
  } else {
    // creating ImageNew
    let ImageNew = new Image(req.query.url);
    // loading ImageNew
    ImageNew.validateSource(req.query.token, (err) => {
      if (err) {
        res.send(500, {err: err});
        next(err);
      } else {
        // Converting Image
        ImageNew.convertImage((err, info) => {
          if (err) {
            res.send(500, {err: err});
          } else {
            // redirects to the converted image
            // reaches this point after image creation is completed
            // Blocks CPU to a large extent
            res.redirect('./../public/compressed/' + req.query.url.split('/').join(''),
                        next);
          }
          return ImageNew.end();
        });
      }
    });
  }
};

/**
* @description - downloads image , requires req.query.url
* @function download_image - controller
* @param {object} req
* @param {object} res
*/
exports.download_image = function (req, res, next) {
  if (req.query.url === undefined) {
    // url should be defined
    return res.send(400, {err: 'Invalid parameter , url is not defined'});
  } else {
    // creating ImageNew
    let ImageNew = new Image(req.query.url, req.query.token);
    // loading ImageNew
    ImageNew.validateSourceAndDownload(req.query.query, (err) => {
      if (err) {
        res.send(500, {err: err,
          msg:'An error has occured,if the err key points to empty it is very much likely that your query param is invalid'});
        //return next(err);
      } else {
        // Converting Image
        res.send(200, {err: null});
      }
    });
  }
};

/**
* @description - zips image , requires token
* @function - zips the entire structure
* @param {object} req
* @param {object} res
*/
exports.zip = function (req, res, next) {
  let ImageNew = new Image(req.query.url, req.query.token);
  let fileName = req.query.token + '.zip';
  let redirectURI = ImageNew.zip();
  return res.redirect('./../public/' + fileName,
              next);
};
