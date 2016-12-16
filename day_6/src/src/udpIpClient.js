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

import dgram from 'dgram';

const msg = new Buffer('hello afterloe!');

const udpNet = dgram.createSocket('udp4');

// send(buff, offset, length, port, host, callback);
udpNet.send(msg, 0, msg.length, 15012, '0.0.0.0', (err, bytes) => {
	if(err) console.log(err);
	console.log(bytes);
	udpNet.close();
});
