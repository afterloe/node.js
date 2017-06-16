/**
 *	co模块 async 处理并发的异步操作
 */
const co = require("co");

co(function* (){
	let res = yield [Promise.resolve(1),Promise.resolve(2)];
	console.log(res);
	yield Promise.resolve(3);
}).catch(err => console.log(err));

co(function* (){
	let res = yield {
		1 : Promise.resolve(1),
		2 : Promise.resolve(2)
	};
	console.log(res);
	yield Promise.resolve(3);
}).catch(err => console.log(err));

co(function* (){
	let values = [n1,n2,n3];
	yield values.map(somethingAsync);
});

function* somethingAsync(x){
	return y;
}
