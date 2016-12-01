let arr1 = [1,2,3,4];
let arr2 = new Array(1,2,3,4);

// 跨语言常用
for(let i =0 ;i < arr1.length; i++){
	console.log(arr1[i]);
}

// 获取数组中的值
for(let value of arr1){
	console.log(value);
}

// 第一种的简写
for(let i in arr1){
	console.log(arr1[i]);
}

// 用的是forEach方法，用一个方法来遍历数组，方法里面第一个参数是
// 每次遍历的值，第二个就是值对应的索引

// 获取到Array的原型中的forEach方法然后函数调用改变this指向
Array.prototype.forEach.call(arr1,(value,index) => {
	console.log(value,index);
});
arr1.forEach(function(value,index){
	console.log(value,index);
});

// 所有的对象的key循环，可以遍历Object，JSON
console.log(Object.keys(arr1));

// console.log(Object.values(arr1));
