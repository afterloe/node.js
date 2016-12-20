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

var _child_process = require('child_process');

var encode = 'UTF8';
var command = 'git status';

(0, _child_process.exec)(command, function (err, stdout, stderr) {
  if (err) {
    console.log('exec cmd err! msg is %s', err['message']);
    return;
  }

  console.log(stdout.toString(encode));
  console.log(stderr.toString(encode));
});