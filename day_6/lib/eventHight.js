/**!
 * day_6 - eventHight.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectList = undefined;

var _mysqlConnection = require('./mysqlConnection');

var _mysqlConnection2 = _interopRequireDefault(_mysqlConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = new _mysqlConnection2.default();
var procxy = new event.EventEmitter();
var status = 'ready';

function selectList(callback) {
  procxy.once('selected', callback);
  if ('ready' === status) {
    status = 'pending';
    db.select('sql', function (results) {
      procxy.emit('selected', results);
      status = 'ready';
    });
  }
};

exports.selectList = selectList;