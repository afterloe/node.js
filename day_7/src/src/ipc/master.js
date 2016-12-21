/**!
 * afterloe - lib/ipc/master.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

import {fork} from 'child_process';
import {resolve} from 'path';
import {cpus} from 'os';
import {createServer} from 'net';

const [__port, __host] = [10030, '127.0.0.1'];
const [num, workerPath, server] = [cpus().length, resolve(__dirname, 'worker'), createServer()];

server.listen(__port, __host, () => {
	console.log('%s master server is running in %s:%s', new Date, __host, __port);
	for(let i=0; i< num; i++) {
		fork(workerPath).send('server', server);
	}

	server.close();
	console.log('%s master server is stop', new Date);
});
