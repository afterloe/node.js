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

var _child_process = require('child_process');

var df = (0, _child_process.spawn)('df', ['-h']);
var grep = (0, _child_process.spawn)('grep', ['tmpfs']);

df['stdout'].on('data', function (data) {
  return grep['stdin'].write(data);
});
df['stderr'].on('data', function (data) {
  return console.log(data.toString());
});

df.on('close', function (code) {
  console.log('ps aux node is execute over');
  grep['stdin'].end();
});

grep['stdout'].on('data', function (data) {
  return console.log(data.toString());
});
grep['stderr'].on('data', function (data) {
  return console.log(data.toString());
});
grep.on('close', function (code) {
  return console.log('grep node is execute over');
});