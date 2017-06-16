/**!
 * afterloe - day_7/spawn_demo.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

import {spawn} from 'child_process';

const df = spawn('df', ['-h']);
const grep = spawn('grep', ['tmpfs']);

df['stdout'].on('data', data => grep['stdin'].write(data));
df['stderr'].on('data', data => console.log(data.toString()));

df.on('close', code => {
	console.log('ps aux node is execute over');
	grep['stdin'].end();
});

grep['stdout'].on('data', data => console.log(data.toString()));
grep['stderr'].on('data', data => console.log(data.toString()));
grep.on('close', code => console.log('grep node is execute over'));
