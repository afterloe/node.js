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

import {createServer} from 'net';

const server = createServer(socket => {
	socket.on('data', data => {
		socket.write('hello !');
		socket.end();
	});

	socket.on('end', () => console.log('socket is handle'));

	socket.write('welecom to my tcpServer\n');
});

server.listen(40000,'127.0.0.1', () => console.log('tcp server is running in localhost:40000'));
