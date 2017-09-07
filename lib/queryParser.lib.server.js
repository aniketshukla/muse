'use strict';
/**
*This module provides a method for parsing image responsible
* and providing a suitable path to save image library
*/
var vm = require('vm');
var util = require('util');

module.exports = function (response, query) {
  if (response === undefined || query === undefined || typeof (query) !== 'string') {
    return '';
  } else {
    let context = new vm.createContext(response);
    let codeVM = new vm.Script(query);
    let result = codeVM.runInContext(context);
    return result;
  }
};
