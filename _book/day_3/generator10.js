/**
 * Generator与协程
 *
 * 协程是一种程序的运行方式可以理解为协作的线程，或者协作的函数，可以使用单线程也可以使用多线程实现。
 * 只不过后者是一种特殊的线程
 *
 * 1.协程与子列程的差异
 *     传统的子列程采用堆栈模式--后进先出的执行方式，只有当调用的子函数完全执行才会去结束执行的父函数。
 * 不过协程与子列程不同的是，多线程或多函数可以并行执行，但是只有一个函数处于运行状态。其他处于暂停状态，
 * 函数之间可以进行状态交换。然后再收回执行全再恢复，这种交换执行权的函数称为-- 协程
 *
 * 2.差异
 *     在内存中子列程只使用一个栈，而协程存在多个栈。但是只有一个栈是在运行状态，换句话说协程是以占用内存为代价，
 * 实现多任务的并行。
 *
 * 3.协程与普通线程的差异
 *     协程运用的场景是多任务的环境下，在这个前提之下他与普通的函数一样，都有自己的执行的上下文，可以分享全局变量。
 * 不同的是同一个时间下有多个处于运行状态的函数，但是只有一个运行协程，其他的协程函数都处于暂停状态。但是不同于多
 * 线程的是，线程的切换取决与环境和优先级。而协程是合作式，执行权由协程自己分配。
 *     由于node是单线程语言，智能保持一个调用栈。引入协程之后，每个任务可以保持自己的调用栈，与回调不同的是当抛出
 * 异常的时候协程函数是可以找到原始的调用栈，而回调则彻底丢失了。
 *     Generator函数实现的协程只是半协程，只有Generator函数的调用者才能将程序的执行权还给Generator函数，如果是全协程函
 * 数的话，任意函数都能够暂停协程函数。而且多个需要相互协助的任务之间是要使用yield语句交换控制权的。
 */

// Generator函数的运用场景 -- 异步操作同步表达化

function showLoadingScreen(){
	console.log("加载UI");
};

function loadUIDataAsynchronously(){
	setTimeout(() => {
		console.log("加载UI数据");
	},2000);
};

function hideLoadingScreen(){
	console.log("卸载UI");
};

function* LoadUI(){
	showLoadingScreen();
	yield loadUIDataAsynchronously();
	hideLoadingScreen();
};

let loader = LoadUI();

loader.next(); // 获取到loadUI函数的遍历器，第一次调用next的时候展示UI同时异步加载UI数据。等UI数据加载完成的时候在调用next就会隐藏界面
loader.next();


// 通过Generator函数部署Ajax操作
function* main(){
	let result = yield request("http://www.baidu.com");
	let data = JSON.parse(result);
	console.log("转化数据成功");
	console.log(data);
};

let it = main();

function request(url){
	setTimeout(() => {
		it.next(`{"name":"afterloe","age":"5"}`);
	},2000);
};

it.next();


// Generator 逐行读取文本文件
function* numReader(){
	let file = new FileReader("./generator3.js");
	try{
		while(!file.eof){
			yield parseInt(file.readLine(), 10);
		}
	}finally{
		file.close();
	}
};
