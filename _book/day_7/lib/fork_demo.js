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

var _child_process = require('child_process');

var _path = require('path');

var encode = 'UTF8';
var modulePath = (0, _path.resolve)(__dirname, '..', 'lib', 'execFile_demo');

(0, _child_process.fork)(modulePath);