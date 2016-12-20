/**!
 * afterloe - day_7/lib/worker.js
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
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end('{"name":"afterloe", "mail": "lm6289511@gmail.com"}');
});

var port = 10030 + Math.round((1 + Math.random()) * 1000),
    host = '127.0.0.1';

server.listen(port, host, function () {
  return console.log('server is running in ' + host + ':' + port);
});