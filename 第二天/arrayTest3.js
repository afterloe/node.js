let arr = [{id:1},{id:2},{id:3}];

let target = arr.find(obj => 5 === obj.id);

console.log(target);

let index = arr.findIndex(obj => 5 === obj.id);

console.log(index);
