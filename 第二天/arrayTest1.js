let arr = 
	new Array({name : "joe"},{name : "grace"},{name : "jiang"});

for(let i=0; i< arr.length; i++){
	if("grace" === arr[i].name) {
		console.log(arr[i]);
	}
}

for(let value of arr){
	if("grace" === value.name) {
		console.log(value);
	}
}

for(let i in arr){
	if("grace" === arr[i].name) {
		console.log(arr[i]);
	}
}

// Ecmascript 5
arr.forEach(function(value,index){
	if("joe" === value.name){
         console.log(value);
	}
});
// Ecmascript 6
arr.forEach((value,index) => {
	if("joe" === value.name){
		console.log(value);
	}
});
Array.prototype.forEach.call(arr,value => "joe" === value.name? console.log(value):null);
arr.forEach(value => "joe" === value.name ? console.log(value) : null);
