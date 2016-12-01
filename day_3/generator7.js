function* inner1(){
	yield "hello";
}

function* inner2(){
	yield* ["afterloe","joe","yangyangyang"];
}

function* outer1(){
	yield "open";
	yield* inner1();	//	注意的是如果yield不带*的调用另外一个Generator函数是会返回一个遍历器
	yield* inner2();	//	如果Generator函数返回的是数组，数组是支持遍历器。如果遍历器方法中使用不带*的yield语句，则返回的是数组本身
	yield "close";
}

function* outer2(){
	yield "open-outer1";
	yield* outer1();
	yield "close-outer1";
}

// let gen = outer2();

for(let value of outer2()){
	console.log(value);
}

console.log("=======================>>>  fun2");

function* foo (){
	yield 2;
	yield 3;
	return "foo";
}

function* bar(){
	yield 1;
	let v = yield* foo();
	console.log(`v : ${v}`);
	yield 4;
};

// yield* 语句可以方便的取出嵌套数组的所有成员
for(let value of bar()){
	console.log(value);
}
