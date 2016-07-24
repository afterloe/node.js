/**
 *	Promise 对象
 *
 * @author	afterloe
 * @mail	afterloeliu@jwis.cn
 */

/**
调用自己封装的node模块

const sn = require("simpleNode");

sn.readFile("./generator12.js").then(data => console.log(data));

*/


/*
 * 	Promise 对象含义:
 * 		传递异步操作的信息，提供该事件的统一的一种API实现
 * 		1.) 对象的状态不受外界的影响，类似于Generator的状态机。Promise分为三种状态，Pending - 进行中、Resolved - 完成、Rejected - 失败
 * 		2.) 一旦状态改变就不会再变，任何时候都可以获取这个结果，但是Promise状态只能从Pending到Resolved 或 Penging到Rejected。当这两种情况
 * 	发生的时候Promise对象的状态就凝固了，会一直保持这个状态，无法再用回调函数或其他方法改变状态。这与Event完全不同，时间的特点是如果错过了
 * 	事件再去监听是不会得到结果的。但是Promise对象，错过之后依然能够获取到他的执行结果。
 * 		3.) Promise对象也是有缺点的，一旦新建之后就会立即执行，无法中途取消。如果不设置回调函数，Promise对象内部抛出的异常是不会到外界。Promise
 * 	对象只有三种状态，无法得知异步任务的进度
 */

let promise = new Promise((resolve,reject) => {
	// ... some async code

	if(true /* 异步操作成功 */){
		resolve(/* data */);
	} else {
		reject(/* err */);
	}
});

promise.then(success => {}, faile => {});


let timeout = ms => new Promise(resolve => setTimeout(resolve,ms,"done"));

timeout(2000).then(value => console.log(value));

// Promise.prototype.then 可以接受多个then中的回调函数，不同的是，第一个回调函数完成之后，会将返回结果作为参数传入到下一个回调函数中
// getJSON("/post.json").then(post => getJSON(post.commentURL)).then(command => console.log("resolved",command), err => console.log("reject",err));
