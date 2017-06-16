/**!
 * afterloe - day_7/lib/fork_demo.js
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

const encode = 'UTF8';
const modulePath = resolve(__dirname, '..', 'lib', 'execFile_demo');

fork(modulePath);
