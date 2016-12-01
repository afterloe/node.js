/**
 *	Generator 推导式 管理Promise流程
 *
 *	异步编程对node来说太重要了，在Ecmascript6 之前的异步编程方式为 回调函数、事件监听、发布/订阅、Promise
 *	现在新的Ecmascript添加了Generator的协程，使用Generator推导式来管理Promise流程
 */
function getFoo(){
	return Promise.resolve("foo");
};

let g = function* (){
	try{
		let foo = yield getFoo();
		console.log(foo);
	}catch(err){
		console.log(err);
	}
};

function run(generator){
	let it = generator();

	function go(result){
		if(result.done) return result.value;

		return result.value.then(value => go(it.next(value))).catch(err => go(it.throw(value)));
	}

	go(it.next());
};

run(g);
