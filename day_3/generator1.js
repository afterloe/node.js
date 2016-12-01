/**
 *	Generator 函数 demo
 *
 * @author 	afterloe
 * @mail	afterloeliu@jwis.cn
 *
 */
function * helloWorldGenerator(){
	yield "hello";
	yield "world";
	return "afterloe";
};

let hw = helloWorldGenerator(); // 申明之后直接调用是不会执行的。

// Generator函数内定义了3个状态，第一个是hello，第二个状态是 world，第三个就是返回（结束的时候运行）

console.log(hw.next()); // 每调用一次next方法就将内部指针移动到下一个状态上
console.log(hw.next());
console.log(hw.next()); // 当done对象为true的时候，表示循环结束了。
console.log(hw.next());
