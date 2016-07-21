let a = (_a,_b) => {
   console.log(_a,_b);
};

let b  = function(_a,_b){
	console.log(_a,_b);
};

let c = (...args) => {
	console.log(args);
};

let d = () => {
	console.log(arguments);
};

let obj = {name : "afterloe"};
let obj2 = {name : "aaa"};

//a.apply(obj,["hello","world"]);
//a.call(obj,"hello","world");
c.apply(obj,[obj,obj]);
c.apply(obj,[obj]);
d.apply(null,[obj,obj]);
//b.apply(obj);
//b.apply(obj2);
//a("afterloe");
//b("afterloe");

// [1,2,3,4].forEach(__a => console.log(__a++));
