/**
 *		yield* 语句的运用
 *
 *  只要在yield命令后面添加*号表示他翻会的是一个遍历器，这也被称为yield* 语句
 */
let delegatedIterator = (function* (){
	yield "hello!";
	yield "Bybe!";
})();

/**
 *	yield* 语句相当于在Generator函数内部署一个for...of语句，用于执行其他的Generator语句
 */
let delegatingIterator = (function* (){
	yield "Greeting!";
	yield* delegatedIterator;
	yield "Ok,bybe~ this ending";
})();

for(let value of delegatingIterator){
	console.log(value);
}
