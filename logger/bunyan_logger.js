'use strict';
/**
* Bunyan loogger for logging the app
*/

var Logger = require('bunyan');

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
      path: './logger/trace.log',
      level: 'trace'
    },
    {
      path: './logger/fatal.log',
      level: 'fatal'
    },
    {
      path: './logger/error.log',
      level: 'error'
    },
    {
      path: './logger/warn.log',
      level: 'warn'
    },
    {
      path: './logger/info.log',
      level: 'info'
    }
  ],
  serializers: require('restify').bunyan.serializers
});
