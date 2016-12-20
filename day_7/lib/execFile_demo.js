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

var _path = require('path');

var _child_process = require('child_process');

var filePath = (0, _path.resolve)(__dirname, '..', 'git.sh');
var encode = 'UTF8';

(0, _child_process.execFile)('/bin/bash', [filePath], function (err, stdout, stderr) {
  if (err) {
    console.log('execute %s find error, msg is %s', filePath, err['message']);
    return;
  }

  console.log(stdout.toString(encode));
  console.log(stderr.toString(encode));
});