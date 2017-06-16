/**!
 * afterloe - lib/ipc_2/worker.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = _http2.default.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end('{"name":"afterloe", "mail":"lm6289511@gmail.com", "friends":["joe", "yang"], "handler": "handler by ' + process['pid'] + '"}');
});

process.on('message', function (msg, handler) {
  if ('start-up' === msg) {
    console.log('child-%s server is ready to running', process['pid']);
    handler.on('connection', function (socket) {
      return server.emit('connection', socket);
    });
  }
});