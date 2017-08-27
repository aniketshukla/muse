'use strict';
/**
* Bunyan loogger for logging the app
*/

var Logger = require('bunyan');
var path = require('path');
/**
exports a logger
*/
module.exports = new Logger({
  name: 'restify looger',
  streams: [
    {
      stream: process.stdout,
      level: 'debug'
    },
    {
      path: path.join(__dirname, '/trace.log'),
      level: 'trace'
    },
    {
      path: path.join(__dirname, '/fatal.log'),
      level: 'fatal'
    },
    {
      path: path.join(__dirname, '/error.log'),
      level: 'error'
    },
    {
      path: path.join(__dirname, '/warn.log'),
      level: 'warn'
    },
    {
      path: path.join(__dirname, '/info.log'),
      level: 'info'
    }
  ],
  serializers: require('restify').bunyan.serializers
});
