/**!
 * afterloe - day_6/lib/udpIpClient.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

var _dgram = require('dgram');

var _dgram2 = _interopRequireDefault(_dgram);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var msg = new Buffer('hello afterloe!');

var udpNet = _dgram2.default.createSocket('udp4');

// send(buff, offset, length, port, host, callback);
udpNet.send(msg, 0, msg.length, 15012, '0.0.0.0', function (err, bytes) {
  if (err) console.log(err);
  console.log(bytes);
  udpNet.close();
});