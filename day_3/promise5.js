/**
 *	基于Generator推导式的Promise 异步任务封装
 */
const fetch = require("node-fetch");

function* gen(){
	let url = "https://api.github.com/users/github",
		result = yield fetch(url); // 由于Fetch模块返回的是一个Promise对象，因此要用then方法调用下一个next方法
	console.log(result.bio);
};

let g = gen(),
	result = g.next();

// 该操作是先读取一个远程接口，然后从JSON格式的数据中解析信息
result.value.then(data => data.json()).then(data => g.next(data));
