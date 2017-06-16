# promise于Generator

Genetator函数是Ecmascript6推出的一种异步编程的解决方案。语法与行为和传统的函数完全不同Generator函数有多种理解角度，从语法上来看，可以把他理解成一个内部状态的遍历器。或者说是一个状态机，每调用一次则进入到下一个内部状态。而Generator函数可以控制内部的变化并依次遍历这些状态。

Generator函数的两个特征：
* 函数名后带有*号
* 包含yield语句

```javascript
function * helloWorldGenerator(){
        yield "hello";
        yield "world";
        return "afterloe";
};

let hw = helloWorldGenerator(); // 申明之后直接调用是不会执行的。

// Generator函数内定义了3个状态，第一个是hello，第二个状态是 world，第三个就是返回（结束的时候运行）

console.log(hw.next()); // 每调用一次next方法就将内部指针移动到下一个状态上
console.log(hw.next());
console.log(hw.next()); // 当done对象为true的时候，表示循环结束了。
console.log(hw.next());
```

generator 函数是惰性求值的，只有yield指针移动到下一个状态才会去执行,另外值得注意的是yield语句是不能用在普通函数中的

```javascript
function * genera(){
        yield 123 + 456 + 789;
};
let g = genera();

console.log(g.next());
console.log(g.next());

function* timeOut(){
        console.log("缓执行函数");
}
let t = timeOut();
setTimeout(() => t.next(), 3000);
```
## Generator遍历

```javascript
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
```

Generator函数中 yield 是没有返回值的，所以可以在next函数中传入一个参数作为上一个yield的返回值

```javascript
function* f () {
        for(let i=0;true;i++){
                let reset = yield i;
                if(reset) i = -1;
        }
}

let g = f();

console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next(true));

console.log("======================>>> f2");

function* f2 (x) {
        let y = 2*(yield (x + 1));
        let z = yield (y/3);
        return (x+y+z);
};

g = f2(5);
console.log(g.next()); // 执行第一个yield语句的时候传入的值是5 所以这里的返回值是 5+1 所以是6
console.log(g.next()); // 由于上一次没有传入值，所以执行第二个yield的时候 NaN/3 还是 NaN
console.log(g.next()); // 由于NaN+6+NaN 所以值还是NaN

console.log("======================>>> f3");

g = f2(5);
console.log(g.next());          // 理由如上，在next之前传入了yield的值， 5+1 所以为6,注
意的是V8会忽略第一次使用next方法传入的值，只有第二次才有效
console.log(g.next(12));        // 传入的是 y = 2*12 /3 所以这次的yield的值为 8
console.log(g.next(13));        // 已知x 为 5，y为24 z为传入的13 所以值是 24+13+5为 42
```

Generator函数 可以被`for...of`自动遍历，不需要调用next方法,`for...of` 遍历会依次显示6个yield的值，当返回的对象中的done为true的时候就会自动中断循环。而且中断的时候是不会返回中断对象的，也就是说不会返回return中的值

```javascript
function* foo(){
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        yield 5;
        yield 6;

        return 7;
}

for(let v of foo()){
        console.log(v);
}
```

值得注意的是 Generator函数的一个特点，他可以在函数体外抛出异常，然后再函数体内捕获`Generator.throw`方法抛出的异常可以被函数体内的`try-catch`捕获处理，但是使用`throw`的方法产生的异常，Generator函数是无法被捕获的

```javascript
let g = function* (){
        while(true){
                try{
                        yield
                }catch(e){
                        if("a" !== e) throw e;                  // 将异常交由上层遍历的iterator来处理
                        console.log("内部捕获异常 ", e);
                }
        }
};

let i = g();
i.next();

try{
        i.throw("a"); // 直接使用抛出异常
        i.throw("b");
        //      throw new Error("a");  这种方式抛出的异常是不会被Generator函数体内的try-catch捕获的,
        //      如果Generator函数内部没有部署try-catch那么产生的异常会被外部的try-catch处理。没有被处理
        //      的异常是会终止函数遍历的。
}catch(e){
        console.log("外部捕获异常 ", e);
}
```
