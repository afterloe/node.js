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

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = _http2.default.createServer(function (req, res) {
	//	if(Math.random() >= 0.5) throw new Error('err');
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end('{"name":"afterloe", "mail":"lm6289511@gmail.com", "friends":["joe", "yang"], "handler": "handler by ' + process['pid'] + '"}');
});

var workerServer = void 0;

process.on('message', function (msg, handler) {
	if ('start-up' === msg) {
		console.log('child-%s server is ready to running', process['pid']);
		workerServer = handler;
		workerServer.on('connection', function (socket) {
			return server.emit('connection', socket);
		});
	}
});

process.on('uncaughtException', function (err) {
	console.log(err);
	process.send({ act: 'suicide' });
	// 关闭socket， 停止接收请求
	workerServer.close(function () {
		process.exit(1); // 当链接断开后，退出进程
	});

	process.nextTick(function () {
		return process.exit(1);
	});
});