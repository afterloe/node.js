/**
 *	部署iterator接口
 *
 *	利用Generator函数可以在任意对象上部署iterator接口
 *	for...of 调用的是Iterator接口
 */
function* iteratorInterface(obj){
	let keys = Object.keys(obj);
	for(let key of keys) yield [key,obj[key]];
}

let myObj = {name : "afterloe", age : 5, tel : "13266548013", pic : "file://127.0.0.1:10030/img/afterloe"};

for(let [key,value] of iteratorInterface(myObj)){
	console.log(key,value);
}
