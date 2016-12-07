/**!
 *  - clientTCP.js 
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

var _net = require('net');

var client = (0, _net.connect)(40000, '127.0.0.1', function () {
  return console.log('connected tcp server');
});

client.write('hello i\'m client');

client.on('data', function (buf) {
  console.log(buf);
  client.end();
});

client.on('error', function (err) {
  return console.log(err);
});

client.on('end', function () {
  return console.log('lost connection ... ');
});