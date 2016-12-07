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

import {createServer} from 'net';

const server = createServer(socket => {
	socket.on('data', buf => {
		console.log(buf);
		socket.write('info is receive');
		socket.end();
	});

	socket.on('end', () => console.log('socket is end'));

	socket.write('welectom to connection afterloe domain server\n');
});

const domainPath = `${process['env']['HOME']}/testTcp.socket`;

server.listen(domainPath, () => console.log(`server is running in ${domainPath}`));

