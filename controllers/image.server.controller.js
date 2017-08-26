'use strict';
var Image = require('./../lib/image.lib.server');

exports.convert_image = function (req, res, next) {
  if (req.query.url === undefined) {
    return res.send(400, {err: 'Invalid parameter , url is not defined'});
  } else {
    let ImageNew = new Image(req.query.url);
    ImageNew.loadImage((err) => {
      if (err) {
        return res.send(500, {err: err});
      } else {
        ImageNew.convertImage((err, info) => {
          if (err) {
            res.send(500, {err: err});
          } else {
            res.redirect('./../public/compressed/' + req.query.url.split('/').join(''),
                        next);
          }
          return ImageNew.end();
        });
      }
    });
  }
};
