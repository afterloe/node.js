# 数组的使用

数组作为js的基础的数据类型，如何进行便利是一个难题，这里我介绍几种遍历方式，由项目组成员自己决定使用哪种方式进行遍历

```javascript
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

```
当然，数组的声明和使用用新的遍历方式是很重要的，也可以通过prototype来进行扩展

```javascript
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
```

ES6 同时还添加了一个新的方法，`find`和`findIndex`，方便业务人员更好的编写代码

```javascript
let arr = [{id:1},{id:2},{id:3}];

let target = arr.find(obj => 3 === obj.id);

console.log(target);

let index = arr.findIndex(obj => 3 === obj.id);

console.log(index);
```
对于Object 方法，ES6同时也添加了很多扩展方法 比如 `Object.values`，而且Node也支持了Java的继承模式

```javascript
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
//              throw new Error("子类未实现");
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
```
