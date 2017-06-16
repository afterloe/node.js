/**!
 * afterloe - day_7/lib/execFile_demo.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

import {resolve} from 'path';
import {execFile} from 'child_process';

const filePath = resolve(__dirname, '..', 'git.sh');
const encode = 'UTF8';

/*
execFile(filePath, (err, stdout, stderr) => {
	if (err) {
		console.log('execute %s find error, msg is %s', filePath, err['message']);
		return ;
	}

	console.log(stdout.toString(encode));
	console.log(stderr.toString(encode));
});
*/

execFile('/bin/bash', [filePath], (err, stdout, stderr) => {
	if (err) {
		console.log('execute %s find error, msg is %s', filePath, err['message']);
		return ;
	}

	console.log(stdout.toString(encode));
	console.log(stderr.toString(encode));
});
