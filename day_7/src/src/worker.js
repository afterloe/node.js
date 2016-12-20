/**!
 * afterloe - day_7/lib/worker.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (https://github.com/afterloe)
 */
"use strict";

import http from 'http';

const server = http.createServer((req, res) => {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end('{"name":"afterloe", "mail": "lm6289511@gmail.com"}');
});

const port = 10030 + Math.round((1 + Math.random()) * 1000), 
	  host = '127.0.0.1';

server.listen(port, host, () => console.log(`server is running in ${host}:${port}`));
