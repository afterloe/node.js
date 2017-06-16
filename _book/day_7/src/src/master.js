/**!
 * afterloe - day_7/lib/master.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

import {fork} from 'child_process';
import os from 'os';

const cpus = os.cpus().length;
for(let i = 0; i < cpus; i++) {
	fork('./worker.js');
}
