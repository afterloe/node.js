/**
 * Generator 遍历 demo 
 *
 * @author	afterloe
 * @mail	afterloeliu@jwis.cn
 */
let arr = [1,[[2,3],4],[5,6]];

let float = function* (a) {
	let length = a.length;
	for(let i=0; i<length; i++){
		let item = a[i];
		if(typeof item !== 'number')
			yield * float(item);
		else
			yield item;
	}
};

for(let f of float(arr)){
	console.log(f);
}
