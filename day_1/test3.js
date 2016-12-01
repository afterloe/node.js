let a = (_a,_b) => console.log(_a,_b);

let b  = function(_a,_b){
//	console.log(_a,_b);
	console.log(this);
};

let c = (...args) => {
//	console.log(args);
	console.log(this);
};

let d = () => {
	console.log(arguments);
};

let obj = {name : "afterloe"};
let obj2 = {name : "aaa"};

//a.apply(obj,["hello","world"]);
//a.call(obj,"hello","world");
obj.b = b;
obj.b();
b.apply(obj2,[obj,obj]); // apply 函数触发，b(xx,x) b
c.apply(obj2,[obj,obj]);
//d.apply(null,[obj,obj]);
//b.apply(obj);
//b.apply(obj2);
//a("afterloe");
//b("afterloe");

// [1,2,3,4].forEach(__a => console.log(__a++));
