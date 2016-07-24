const fs = require("fs");

let readF = fileName => new Promise((resolve,reject) => {
	fs.readFile(fileName,(err,data) => err? reject(err):resolve(data));
});

/** 

let asyncReadFile = async function(){
	let f1 = await readFile("./generator1.js");
	let f2 = await readFile("./generator2.js");
	console.log(f1);
	console.log(f2);
};

*/

let asyncReadFile = function* (){
	let f1 = yield readF("./generator1.js");
	let f2 = yield readF("./generator2.js");
	console.log(f1,f2);
}

asyncReadFile().next().then(data => console.log("./generator1.js out plain success")).catch(err => console.log(err));
