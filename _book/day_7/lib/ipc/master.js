/**!
 * afterloe - lib/ipc/master.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

var _child_process = require('child_process');

var _path = require('path');

var _os = require('os');

var _net = require('net');

var __port = 10030,
    __host = '127.0.0.1';
var _ref = [(0, _os.cpus)().length, (0, _path.resolve)(__dirname, 'worker'), (0, _net.createServer)()],
    num = _ref[0],
    workerPath = _ref[1],
    server = _ref[2];


server.listen(__port, __host, function () {
  console.log('%s master server is running in %s:%s', new Date(), __host, __port);
  for (var i = 0; i < num; i++) {
    (0, _child_process.fork)(workerPath).send('server', server);
  }

  server.close();
  console.log('%s master server is stop', new Date());
});