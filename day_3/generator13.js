/**
 * Generator 作为数据结构
 *
 * 确切的来说是一个数组结构，因为Generator函数可以返回一系列的值，这意味着它可以对任意表达式提供类似数组的接口
 */

/*
 * 返回三个函数由于使用Generator函数，可以向处理数组那样处理三个返回的函数
 */
const fs = require("fs");

function* doStuff(){
	yield fs.readFileSync("generator1.js");
	yield fs.readFileSync("generator2.js");
	yield fs.readFileSync("generator3.js");
}

for(let buf of doStuff()){
	console.log(buf.toString());
}
