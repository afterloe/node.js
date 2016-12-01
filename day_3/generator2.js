/**
 *	Generator 函数 demo2
 *
 * @author 	afterloe
 * @mail	afterloeliu@jwis.cn
 *
 */
function * genera(){
	yield 123 + 456 + 789;
};
let g = genera();

console.log(g.next()); // generator 函数是惰性求值的，只有yield指针移动到下一个状态才会去执行
console.log(g.next());

function* timeOut(){
	console.log("缓执行函数");
}
let t = timeOut();
setTimeout(() => t.next(), 3000); // generator函数只有在调用next的时候才执行。另外值得注意的是yield语句是不能用在普通函数中的
