'use strict';
/**
Creates a restify server and runs it
*/
var restify = require('restify');
var UserRoutes = require('./routes/user.server.routes');
var jsonPatch = require('./routes/patch.server.routes');
var ImageRoutes = require('./routes/image.server.routes');
var logger = require('./logger/bunyan_logger');

/**
Declaring server properties
*/
const server = restify.createServer({
  name: 'muse',
  version: '0.0.1',
  log: logger,
  address: 'http://localhost:3000',
  url: 'http://localhost:3000'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

/**
Addind custom routes
*/
UserRoutes(server);
jsonPatch(server);
ImageRoutes(server);
server.get(/\/public\/.*/, restify.plugins.serveStatic({
  directory: __dirname
}));

server.on('uncaughtException', function (req, res, err, cb) {
  // this listener will fire after both events above!
  // `err` here is the same as the error that was passed to the above
  // error handlers.
  server.log.error({req: req, res: res, err: err});
  return res.send(500, err);
});

server.listen(3000, function () {
  console.log('Running server at port 3000');
});

module.exports = server;
