/**!
 * afterloe - lib/ipc_2/worker.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

import http from 'http';

const server = http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(`{"name":"afterloe", "mail":"lm6289511@gmail.com", "friends":["joe", "yang"], "handler": "handler by ${process['pid']}"}`);
});

process.on('message', (msg, handler) => {
	if ('start-up' === msg) {
		console.log('child-%s server is ready to running', process['pid']);
		handler.on('connection', socket => server.emit('connection', socket));
	}
});
