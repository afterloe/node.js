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

import MySQL from './mysqlConnection';

const db = new MySQL();
const procxy = new event.EventEmitter();
let status = 'ready';

function selectList(callback) {
	procxy.once('selected', callback);
	if('ready' === status) {
		status = 'pending';
		db.select('sql', results => {
			procxy.emit('selected', results);
			status = 'ready';
		});
	}
};

export {selectList};
