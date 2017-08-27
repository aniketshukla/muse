'use strict';
/**
*Controllers for Image functionality
*/
var Image = require('./../lib/image.lib.server');

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
    ImageNew.loadImage((err) => {
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
