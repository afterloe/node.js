// 对象
let user = {
	id : "0001",
	name : "joe",
	age : 45,
	sex : "man",
	sayHello : () => console.log("hello !")
};

let privat_name = Symbol("privat_name");

// User 类
class User {

	constructor(id,name,age,sex){
		this.id = id;
		this.name = name;
		this.age = age;
		this.sex = sex;
	}

	[privat_name](){
		console.log("我是私有方法");
	}

	eat(){
//		throw new Error("子类未实现");
		this[privat_name]();
	}

	sayHello(){
		console.log(`hello i'm ${this.name}'`)
	}
}

class pigZhu extends User {

	constructor(id,name,age,sex){
		super(id,name,age,sex);
		this.desc = "毛比较长";
	}

	sayHello(){
		console.log(`掉渣了 ${this.desc} -- ${this.name}`);
	}

	writeAndroid(){
		console.log("出BUG了，找老王");
	}
}

let jwiUser = new User(250,"江汉包",40,"nv");
console.log(jwiUser);
// console.log(jwiUser);
// jwiUser.sayHello();
jwiUser = new pigZhu(14250,"汉堡包",50,"man");
// jwiUser.writeAndroid();
// jwiUser.sayHello();

console.log(jwiUser);

console.log(user);
// jwiUser.eat();

console.log(Object.keys(jwiUser));

for(let key of Object.keys(jwiUser)){
	console.log(jwiUser[key]);
}

for(let key in jwiUser){
	console.log(jwiUser[key]);
}

Object.prototype.values = json => {
	let values = new Array();
	Object.keys(json).forEach(key => values.push(json[key]));
	return values;
};

console.log(Object.values(jwiUser));

console.log(jwiUser.values(user));
console.log(user.values(jwiUser));
