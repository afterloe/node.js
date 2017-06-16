/**!
 *  - 
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
  socket.on('data', function (buf) {
    console.log(buf);
    socket.write('info is receive');
    socket.end();
  });

  socket.on('end', function () {
    return console.log('socket is end');
  });

  socket.write('welectom to connection afterloe domain server\n');
});

var domainPath = process['env']['HOME'] + '/testTcp.socket';

server.listen(domainPath, function () {
  return console.log('server is running in ' + domainPath);
});