/**
 *		Generator 推导式 最大的优点是惰性求值
 *  含义:Generator是实现状态机的最佳结构
 *
 *	@author		afterloe
 *	@mail		afterloeliu@jwis.cn
 */

// 普通函数实现状态机
let ticking = true;

let clock = () => {
	if(ticking)
		console.log("Tick!");
	else
		console.log("Tock!");
	ticking = !ticking;
};

clock();
clock();
clock();

console.log("================================>>> Generator Function");
// Generator实现状态机
clock = function* (_){
	while(true){
		yield _;
		console.log("Tick!!");
		yield _;
		console.log("Tock!!");
	}
};

/**
 * 与上一个模式而言，没有记录外部模式的变量，而且简洁安全不会被非法篡改。
 *Generator函数本身就是一个状态机，即目前是否处于暂停态
 */
let c = clock();

c.next();
c.next();
c.next();
c.next();
