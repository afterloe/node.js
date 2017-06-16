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

var _child_process = require('child_process');

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cpus = _os2.default.cpus().length;
for (var i = 0; i < cpus; i++) {
  (0, _child_process.fork)('./worker.js');
}