/**!
 * afterloe - lib/ipc3/master.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

var _cluster = require('cluster');

var _cluster2 = _interopRequireDefault(_cluster);

var _path = require('path');

var _child_process = require('child_process');

var _os = require('os');

var _net = require('net');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cluster2.default['schedulingPolicy'] = _cluster2.default['SCHED_RR']; // 启用轮叫调度策略
// cluster['schedulingPolicy'] = cluster['SCHED_NONE']; // 启用抢占式调度策略

var _ref = [(0, _os.cpus)().length, (0, _path.resolve)(__dirname, 'worker'), (0, _net.createServer)(), new Map()],
    nums = _ref[0],
    workerPath = _ref[1],
    server = _ref[2],
    threadManager = _ref[3];
var __port = 10030,
    __host = '127.0.0.1';
var maxLimit = 10,
    during = 1000 * 60,
    restartLog = [];


var tooFrequently = function tooFrequently() {
	var time = Date.now(); // 记录重启时间
	var length = restartLog.push(time);
	if (length > maxLimit) {
		restartLog.shift();
	}

	return length > maxLimit && restartLog[restartLog.length - 1] - restartLog[0] < during;
};

var createThread = function createThread() {

	if (tooFrequently()) {
		process.emit('giveup');
		return;
	}

	var worker = (0, _child_process.fork)(workerPath);
	var pid = worker.pid;


	worker.on('message', function (msg) {
		if ('suicide' === msg['act']) createThread();
	});

	worker.on('exit', function () {
		console.log('worker-' + pid + ' is exited.');
		threadManager.has(pid) ? threadManager.delete(pid) : null;
		createThread();
	});

	worker.send('start-up', server);
	threadManager.set(pid, worker);
	console.log('worker-' + pid + ' is running');
};

server.listen(__port, __host, function () {
	console.log('%s master server is running in %s:%s', new Date(), __host, __port);
	for (var i = 0; i < nums; i++) {
		createThread();
	}
});

process.on('exit', function () {
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = threadManager.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var worker = _step.value;

			worker.kill();
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	threadManager.clear();
	console.log('server will shut down safely');
});

process.on('giveup', function () {
	// 自定义的严重事件，需要日志调节
	console.log('too frequently, master server will shutdown!');
	process.exit(1);
});