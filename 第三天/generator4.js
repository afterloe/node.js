/**
 * 	   Generator函数中 yield函数是没有返回值的。
 * 所以可以在next中传入一个参数作为上一个yield的值
 *
 */

function* f () {
	for(let i=0;true;i++){
		let reset = yield i;
		if(reset) i = -1;
	}
}

let g = f();

console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next(true));

console.log("======================>>> f2");

function* f2 (x) {
	let y = 2*(yield (x + 1));
	let z = yield (y/3);
	return (x+y+z);
};

g = f2(5);
console.log(g.next()); // 执行第一个yield语句的时候传入的值是5 所以这里的返回值是 5+1 所以是6
console.log(g.next()); // 由于上一次没有传入值，所以执行第二个yield的时候 NaN/3 还是 NaN 
console.log(g.next()); // 由于NaN+6+NaN 所以值还是NaN

console.log("======================>>> f3");

g = f2(5);
console.log(g.next());		// 理由如上，在next之前传入了yield的值， 5+1 所以为6,注意的是V8会忽略第一次使用next方法传入的值，只有第二次才有效
console.log(g.next(12));	// 传入的是 y = 2*12 /3 所以这次的yield的值为 8
console.log(g.next(13));	// 已知x 为 5，y为24 z为传入的13 所以值是 24+13+5为 42
