'use strict';
/**
*JSON patch alternate library.
*This library was written to demonstrate.
*a basic functionality of JSON patch.
*Not production ready.
*/

/**
* @description gets the last refernceable object
* @function getLastObject
* @param {json} jsonObject
* @param {string} path
*/
var getLastObject = function (jsonObject, path) {
  var result = jsonObject;
  for (let pathIndex = 0; pathIndex < path.length-1; pathIndex++) {
    result = result[path[pathIndex]];
  }
  return result;
};

/**
* @description handles addtion operation in json patch.
* @function PatchJSONadditionHandler
* @param {json} jsonObject
* @param {string} index - can be number or string
* @param {object} value - the value to be added
*/
var PatchJSONadditionHandler = function (jsonObject, index, value) {
  if (jsonObject instanceof Array) {
    if (index === '-') {
      jsonObject.push(value);
    } else if (Number.isInteger(index) && index > 0) {
      jsonObject[index - 1] = value;
    } else {
      throw new ReferenceError('Invalid index');
    }
  } else if (jsonObject instanceof Object) {
    if (index) {
      jsonObject[index] = value;
    } else {
      throw new ReferenceError('Invalid index');
    }
  } else {
    throw new ReferenceError('Invalid patch applied');
  }
};

/**
* @description Patches JSON
* @function PatchJSON
* @param {json} jsonObject
* @param {string} patch
*/
var PatchJson = function (jsonObject, patch) {
  var path = patch.path.split('/').slice(1);
  var resultNode = getLastObject(jsonObject, path);
  if (patch.path.length === 1) {
    path = [];
  } else if (Number.isInteger(path[path.length - 1]) && path[path.length - 1]>0) {
    path[path.length - 1] = path[path.length - 1] - 1;
  }

  if (patch.op === 'remove') {
    delete resultNode[path[path.length - 1]];
  } else if (patch.op === 'add') {
    PatchJSONadditionHandler(jsonObject, path[path.length - 1], patch.value);
  } else if (patch.op === 'replace') {
    resultNode[path[path.length - 1]] = patch.value;
  } else if (patch.op === 'copy') {
    let pathSource = patch.from.split('/').slice(1);
    let resultNodeSource = getLastObject(jsonObject, pathSource);
    resultNode[path[path.length - 1]] = resultNodeSource[pathSource[pathSource.length - 1]];
  } else if (patch.op === 'move') {
    let pathSource = patch.from.split('/').slice(1);
    let resultNodeSource = getLastObject(jsonObject, pathSource);
    resultNode[path[path.length - 1]] = resultNodeSource[pathSource[pathSource.length - 1]];
    delete resultNodeSource[pathSource[pathSource.length - 1]];
  } else if (patch.op === 'test') {
    if (resultNode[path[path.length - 1]] !== patch.value) {
      throw new ReferenceError('patch.op does not match');
    }
  }
};

/**
* @description exports a function that patches JSON
* @param {json} jsonObject
* @param {string} patch
*/
module.exports = function (jsonObject, patch) {
  var jsonObjectCopy = JSON.parse(JSON.stringify(jsonObject)); // --deepcopy
  try {
    for (let index = 0; index < patch.length; index++){
      PatchJson(jsonObjectCopy, patch[index]);
    }
  } catch (e) {
    console.log(e);
    return false;
  }
  return jsonObjectCopy;
};
