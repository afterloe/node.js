/**
 *	Thunk函数 辅助Generator 推导式进行流程管理
 *
 *	1.自动执行Generator有两种方式，第一种是将异步操作函数包装程Thunk函数。（thunk函数）
 *	2.将异步操作包装成Promise对象，使用then方法交回执行权（co模块）
 */
const [fs,thunkify] = [require("fs"),require("thunkify")];

let readFile = thunkify(fs.readFile),
	gen = function* (){
		let r1 = yield readFile("./generator1.js");
		console.log(r1.toString());
		let r2 = yield readFile("./generator11.js");
		console.log(r2.toString());
		let r3 = yield readFile("./generator12.js");
		console.log(r3.toString());
};

/**
  原始写法

let g = gen();
let r1 = g.next();
r1.value((err,data) => {
	if(err) throw err;
	let r2 = g.next(data);
	r2.value((err,data) => {
		if(err) throw err;
		g.next(data);
	});
});

*/

/**
 *  这是一个基于Thunk函数的Generator的自动执行器，内部的next函数就是Thunk的回调函数，next函数先将指针移到下一步，然后判断是否结束。如果没结束
 *  将net函数传入到Thunk函数(result.value属性)，否则直接退出。
 */
function run(fn){
	let gen = fn();

	function next(err,data){
		let result = gen.next(data);
		if(result.done) return;
		result.value(next);
	}

	next();
};

run(gen);


/**
 *	Promise对象 自动执行Generator函数（模拟co模块第二种）
 */
let readF = fileName => new Promise((resolve,reject) => fs.readFile(fileName,(err,data) => err? reject(err):resolve(data)));

gen = function* (){
	let f1 = yield readF("./promise1.js");
	let f2 = yield readF("./promise2.js");
	console.log(f1.toString(),f2.toString());
};

function _run(gen){
	let g = gen();

	function next(data){
		let result = g.next(data);
		if(result.done) return resule.value;
		result.value.then(data => next(data));
	}

	next();
};

_run(gen);
