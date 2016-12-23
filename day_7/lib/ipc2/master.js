/**!
 * afterloe - lib/ipc2/master.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

var _path = require('path');

var _child_process = require('child_process');

var _os = require('os');

var _net = require('net');

var _ref = [(0, _os.cpus)().length, (0, _path.resolve)(__dirname, 'worker'), (0, _net.createServer)()],
    nums = _ref[0],
    workerPath = _ref[1],
    server = _ref[2];
var __port = 10030,
    __host = '127.0.0.1';


server.listen(__port, __host, function () {
  console.log('%s master server is running in %s:%s', new Date(), __host, __port);
  for (var i = 0; i < nums; i++) {
    (0, _child_process.fork)(workerPath).send('start-up', server);
  }

  console.log('master server will shutdown!');
  server.close();
});