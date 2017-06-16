/**!
 * afterloe - exec_demo.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

import {exec} from 'child_process';

const encode = 'UTF8';
const command = 'git status';

exec(command, (err, stdout, stderr) => {
	if (err) {
		console.log('exec cmd err! msg is %s', err['message']);
		return ;
	}

	console.log(stdout.toString(encode));
	console.log(stderr.toString(encode));
});
