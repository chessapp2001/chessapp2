const http = require('http'),
  express = require('express'),
  socket = require('socket.io');

const config = require('../config');

const myIo = require('./sockets/io'),
  routes = require('./routes/routes');

const app = express(),
  server = http.Server(app),
  io = socket(server);

server.listen(config.port);

myIo(io);

console.log(`Server listening on port ${config.port}`);

routes(app);
