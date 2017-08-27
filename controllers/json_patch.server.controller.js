'use strict';
/**
* Controller for JSON Patching
*/
var JsonPatcher = require('jsonpatch');

/**
* @description - patches json
* @function patch_json - controller
* @param req
* @param res
*/
exports.patch_json = function (req, res, next) {
  if (req.body.json_object === undefined || req.body.json_patch === undefined) {
    // all above condition should be fullfilled
    res.send(400, {err: 'Invalid parameter , supply json_object and the required patch'});
  } else {
    req.body.json_object = jsonHandler(req.body.json_object);
    req.body.json_patch = jsonHandler(req.body.json_patch);
    // catches error if one is thrown while patching
    try {
      let result = JsonPatcher.apply_patch(req.body.json_object, req.body.json_patch);
      res.send(200, result);
    } catch (err) {
      res.send(400, {err: 'json_patch is not applicable on json_object'});
      return next(err);
    }
  }
};

// This function is inspired from a stackoverflow answer
// https://stackoverflow.com/questions/4253367/how-to-escape-a-json-string-containing-newline-characters-using-javascript
var jsonHandler = function (jsonString) {
  if (typeof (jsonString) !== String) {
    return jsonString;
  }
  let jsonStringNew = jsonString.replace(/\n/g, '\\n').replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t')
        .replace(/\f/g, '\\f');
  return JSON.parse(jsonStringNew);
};
