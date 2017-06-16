/**!
 * afterloe - lib/ipc2/master.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

import {resolve} from 'path';
import {fork} from 'child_process';
import {cpus} from 'os';
import {createServer} from 'net';

const [nums, workerPath, server] = [cpus().length, resolve(__dirname, 'worker'), createServer()];
const [__port, __host] = [10030, '127.0.0.1'];

server.listen(__port, __host, () => {
	console.log('%s master server is running in %s:%s', new Date, __host, __port);
	for (let i=0; i<nums; i++) {
		fork(workerPath).send('start-up', server);
	}

	console.log('master server will shutdown!');
	server.close();
});
