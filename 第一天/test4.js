let [g,h,j] = ["a","f"];

let obj = {
	name : "hello",
	number : 1,
	toString : () => {
		return "hello word";
	},
	sex : undefined
};

let conn , conn1 ,conn2

let show = (_obj = new Object()) => {
	let {name,number,sex = 'nan'} = _obj;
	console.log(name,number,sex);
};

//show(obj);
show.apply(this,[obj]);
//show();
// console.log(g,h,j);
