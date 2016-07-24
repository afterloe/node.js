/**
 *	项目工具类
 */

/**
 * 读取Defer对象
 * @return	{[type]} [description]
 */
let getDef = () => {
	let deferred = new Object();
	deferred.promise = new Promise((resolve,reject) => {
		deferred.resolve = resolve;
		deferred.reject = reject;
	});
	return deferred;
};

let when = promise => {
	let deferred = getDef();
	Promise.all(promise).then(data => {
		deferred.resolve(data);
	},err => {
		deferred.reject(err);
	});

	return deferred.promise;
};

module.exports = {
	getDef,when
};
