/**!
 * afterloe - lib/ipc3/worker.js
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
//	if(Math.random() >= 0.5) throw new Error('err');
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(`{"name":"afterloe", "mail":"lm6289511@gmail.com", "friends":["joe", "yang"], "handler": "handler by ${process['pid']}"}`);
});

let workerServer;

process.on('message', (msg, handler) => {
	if ('start-up' === msg) {
		console.log('child-%s server is ready to running', process['pid']);
		workerServer = handler;
		workerServer.on('connection', socket => server.emit('connection', socket));
	}
});

process.on('uncaughtException', err => {
	console.log(err);
	process.send({act: 'suicide'});
	// 关闭socket， 停止接收请求
	workerServer.close(() => {
		process.exit(1); // 当链接断开后，退出进程
	});

	process.nextTick(() => process.exit(1));
});
