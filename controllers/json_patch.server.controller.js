'use strict';
var JsonPatcher = require('jsonpatch');

exports.patch_json = function (req, res) {
  if (req.body.json_object === undefined || req.body.json_patch === undefined) {
    return res.send(400, {err: 'Invalid parameter , supply json_object and the required patch'});
  } else {
    req.body.json_object = JSON.parse(req.body.json_object);
    req.body.json_patch = JSON.parse(req.body.json_patch);
    try {
      let result = JsonPatcher.apply_patch(req.body.json_object, req.body.json_patch);
      return res.send(200, result);
    } catch (err) {
      return res.send(400, {err: 'json_patch is not applicable on json_object'});
    }
  }
};
