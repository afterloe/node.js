/**
 *	Generator函数 可以被for...of 自动遍历，不需要调用next方法
 *
 */
function* foo(){
	yield 1;
	yield 2;
	yield 3;
	yield 4;
	yield 5;
	yield 6;

	return 7;
}

/**
 * for...of 遍历会依次显示6个yield的值，当返回的对象中的done为true的时候就会自动中断循环。
 * 中断的时候是不会返回中断对象的，也就是说不会返回return中的值
 */
for(let v of foo()){
	console.log(v);
}

/**
 * 值得注意的是 Generator函数的一个特点，他可以在函数体外抛出异常，然后再函数体内捕获
 * Generator.throw 方法抛出的异常可以被函数体内的try-catch捕获处理，但是 使用throw的方法
 * 产生的异常，Generator函数是无法被捕获的
 */
let g = function* (){
	while(true){
		try{
			yield
		}catch(e){
			if("a" !== e) throw e;			// 将异常交由上层遍历的iterator来处理
			console.log("内部捕获异常 ", e);
		}
	}
};

let i = g();
i.next();

try{
	i.throw("a"); // 直接使用抛出异常
	i.throw("b");
	//	throw new Error("a");  这种方式抛出的异常是不会被Generator函数体内的try-catch捕获的,
	//	如果Generator函数内部没有部署try-catch那么产生的异常会被外部的try-catch处理。没有被处理
	//	的异常是会终止函数遍历的。
}catch(e){
	console.log("外部捕获异常 ", e);
}
