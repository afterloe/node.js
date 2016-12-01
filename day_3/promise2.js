/**
 *	Promise.prototype.catch
 *
 *	该方法是.then(null,rejection)的别名，用于捕获指定的回调函数抛出的异常,
 *	如果不在内部处理异常，外部是不会得到错误信息的。
 */
getJSON("http://www.baidu.com").then(data => console.log(data)).then(err => console.log(err)); // 等价于下列方法
getJSON("http://www.baidu.com").then(data => console.log(data)).catch(err => console.log(err));

// 如果Promise对象的状态已经编程了resolved的话，在抛出错误是无效的
let promise = new Promise((resolve,reject) => {
	resolve("ok");
	throw new Error("testError"); // 无效的抛出
});

promise.catch(err => {
	console.log(err);  // 不执行
});

// 值得注意的是Promise对象的错误具有冒泡性质，会一直想后传递，直到被捕获为止
// 下列代码中的catch会捕获之前的3个Promise对象抛出的异常，2个getJSON抛出的，一个resolve回调抛出的异常
getJSON("http://www.baidu.com").then(url => getJSON(url)).then(data => console.log(data)).catch(err => console.log(err));

process.on("unhandledRejection",(err,promise) => {
	console.log(err.stack);
	// promise.then();			//	这个事件会捕获发生异常的Promise实例，抓嫩监听reject事件，回调里面第二个promise就是发生异常的对象，
	// 它后面是可以继续调用then方法的。
});
