/**!
 * afterloe - day_6/lib/udpIpServer.js
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

var udpNet = _dgram2.default.createSocket('udp4');

udpNet.on('message', function (msg, addressInfo) {
  console.log('got msg %s from %s:%s', msg, addressInfo['address'], addressInfo['port']);
});

udpNet.on('listening', function () {
  var address = udpNet.address();
  console.log('server is running in %s:%s', address['address'], address['port']);
});

udpNet.bind(15012);