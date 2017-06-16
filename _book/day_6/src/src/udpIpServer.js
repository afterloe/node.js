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

import dgra from 'dgram';

const udpNet = dgra.createSocket('udp4');

udpNet.on('message', (msg, addressInfo) => {
	console.log('got msg %s from %s:%s', msg, addressInfo['address'], addressInfo['port']);
});

udpNet.on('listening', () => {
	const address = udpNet.address();
	console.log('server is running in %s:%s', address['address'], address['port']);
});

udpNet.bind(15012);
