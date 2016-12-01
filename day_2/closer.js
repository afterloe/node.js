let a = (function(){
	let b = "hello";
	let private_sum = "world";
	let c = function(){
		console.log(private_sum);
	};
	return {b,c};
})();

const private_sum = Symbol("private_sum"),private_foun = Symbol("private_foun");

class c {
	constructor(){
		this.b = "hello",
		this[private_sum] = "world";
	}

	d(){
		console.log(this[private_sum]);
	}

	[private_foun](){
		
	}
}

console.log(a);
let cc = new c();
console.log(cc);

console.log(a.c());
console.log(cc.d());
