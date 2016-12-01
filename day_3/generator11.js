/**
 *	Generator函数控制流程
 */

/*
 * 第一种 采用 回调的方式处理 -- 缺点：不多解释。。。写多了连我自己都不知道在些什么
step1(value1 => {
	step2(value) => {
	
	}
});

第二种 采用Promise 改写 将包裹改成了直线执行的形式，但是加入了大量的Promise的语法
Q.fcall(step1).then(step2).then(step3)....

第三种 采用Generator 推导式改写,yield 函数是同步运行的不是异步运行的。但是实际当中一般返回Promise对象
function* longRunningTask() {
	try{
		let value1 = yield step1();
		let value2 = yield step2();
		let value3 = yield step3();
		.
		.
		.
	}catch(e){
		// Handle any Error from any step
	}
};

scheduler(longRunningTask());

function scheduler(task){
	setTimeout(() => {
		let taskObj = task.next(task.value);

		// 如果Task未执行完毕则继续调用
		if(!taskObj.done){
			task.value = taskObj.value;
			scheduler(task);
		}
	},0);
};


返回Promise对象 使用的是Promise的函数库Q，yield语句返回的就是一个Promise对象，多任务依次执行。
const Q = require("q");

function delay(milliseconds){
	let deferred = Q.defer();
	setTimeout(deferred.resolve,milliseconds);
	return deferred.promise;
};

function* f(){
	yield delay(100);
}

如果只有AB都执行完才能执行C时改成如下写法

function* parellelDownloads(){
	let [text1,text2] = yield [
		taskA(),
		taskB()
	];
	console.log(text1,text2);
	taskC();
}

*/
