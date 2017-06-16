/**!
 * day_6 - tcpIpServer.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

var _net = require('net');

var server = (0, _net.createServer)(function (socket) {
  socket.on('data', function (data) {
    socket.write('hello !');
    socket.end();
  });

  socket.on('end', function () {
    return console.log('socket is handle');
  });

  socket.write('welecom to my tcpServer\n');
});

server.listen(40000, '127.0.0.1', function () {
  return console.log('tcp server is running in localhost:40000');
});