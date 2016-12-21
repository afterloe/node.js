/**!
 * afterloe - lib/ipc/worker.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

console.log('%s node fork running, pid is %s', new Date, process['pid']);

process.on('message', (msg, server) => {
	if ('server' === msg) {
		server.on('connection', socket => socket.end(`handler by child process - ${process['pid']}`));
	}
});
