/**!
 *  - clientDomain.js 
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

import {connect} from 'net';

const domainPath = `${process['env']['HOME']}/testTcp.socket`;
const client = connect(domainPath, () => console.log('connected tcp server'));

client.write('hello i\'m client');

client.on('data', buf => {
	console.log(buf);
	client.end();
});

client.on('error', err => console.log(err));

client.on('end', () => console.log('lost connection ... '));
