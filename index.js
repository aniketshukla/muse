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
  log: logger
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

server.on('restifyError', function (req, res, err, cb) {
  // this listener will fire after both events above!
  // `err` here is the same as the error that was passed to the above
  // error handlers.
  server.log.error({req: req, res: res, err: err});
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
