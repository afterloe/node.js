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

import cluster from 'cluster';
import {resolve} from 'path';
import {fork} from 'child_process';
import {cpus} from 'os';
import {createServer} from 'net';

cluster['schedulingPolicy'] = cluster['SCHED_RR']; // 启用轮叫调度策略
// cluster['schedulingPolicy'] = cluster['SCHED_NONE']; // 启用抢占式调度策略

const [nums, workerPath, server, threadManager] = [cpus().length, resolve(__dirname, 'worker'), createServer(), new Map()];
const [__port, __host] = [10030, '127.0.0.1'];
const [maxLimit, during, restartLog] = [10, 1000 * 60, []];

const tooFrequently = () => {
	const time = Date.now(); // 记录重启时间
	const length = restartLog.push(time);
	if (length > maxLimit) {
		restartLog.shift();
	}

	return length > maxLimit && restartLog[restartLog.length - 1] - restartLog[0] < during;
}

const createThread = () => {
	
	if (tooFrequently()) {
		process.emit('giveup');
		return;
	}

	const worker = fork(workerPath);
	const {pid} = worker;

	worker.on('message', msg => {
		if ('suicide' === msg['act']) createThread();
	});

	worker.on('exit', () => {
		console.log(`worker-${pid} is exited.`);
		threadManager.has(pid) ? threadManager.delete(pid): null;
		createThread();
	});

	worker.send('start-up', server);
	threadManager.set(pid, worker);
	console.log(`worker-${pid} is running`);
}

server.listen(__port, __host, () => {
	console.log('%s master server is running in %s:%s', new Date, __host, __port);
	for (let i=0; i<nums; i++) {
		createThread();
	}
});

process.on('exit', () => {
	for(let worker of threadManager.values()) {
		worker.kill();
	}

	threadManager.clear();
	console.log('server will shut down safely');
});

process.on('giveup', () => {
	// 自定义的严重事件，需要日志调节
	console.log('too frequently, master server will shutdown!');
	process.exit(1);
});
