# Node 基础

## 第一个node程序

输出一句hello

```javascript
let a = "hello";
console.log(a);
```
## 函数和变量的作用域

很多情况下，我们建议的是先声明后调用。在node里也是一样，而且在括号内的域是不一样的，在括号内的是可以被重新赋值的。而node的寻值方式是向上搜索，当搜索到就不再向后搜索。当然用`const` 声明的变量是不能再被修改的

### let 和 const
> 不存在变量提升 , 只能在声明的位置后面使用。   
> 块级作用域  

### const
> const 声明一个只读的常量。一旦声明，常量的值就不能改变。   
> 只声明不赋值，就会报错。  

```javascript
let a = "hello";
const b = "word";

console.log(a + b);

{
	// b = "aaaa";  // 不注释会报错
	let a = "my";
	console.log(a + b);
}

console.log(a + b);
```

### 箭头函数、可变参

ES6引入了lambda 表达式允许使用 => 来申明函数，而箭头函数的出现极大的推进了函数编程的风格。但是箭头函数是有一个天坑，就是函数内部的this一经定义就无法再修改，而且无法通过`apply`或`call`这两个方法来改变，所以想用this来动态修改的话，请还是用回`function`的形式。

下面是箭头函数的一些**注意事项**

> 函数体内的`this`对象，就是定义时所在的对象，而不是使 用时所在的对象。  
> 不可以当作构造函数，也就是说不可以使用`new`命令， 否则会抛出一个错误。  
> 不可以使用`arguments`对象，该对象在函数体内不存在。 如果要用，可以用`Rest`(...args)参数代替。  
> 不可以使用`yield`命令，因此箭头函数不能用作`Generator`函数。  
> `this`对象的指向是可变的，但是在箭头函数中，它是固定的。  

```javascript
let a = (_a, _b) => console.log(_a, _b);

let b = function(_a, _b) {
	console.log(_a, _b);
	console.log(this);
}

let c = (...args) => {
	console.log(args);
	console.log(this);
}

let d = () => {
	console.log(arguments);
}

let obj = {name: "afterloe"};
let obj1 = {name: "aaa"};

//a.apply(obj,["hello","world"]);
//a.call(obj,"hello","world");
obj.b = b;
obj.b();
b.apply(obj2,[obj,obj]); // apply 函数触发，b(xx,x) b
c.apply(obj2,[obj,obj]);
//d.apply(null,[obj,obj]);
//b.apply(obj);
//b.apply(obj2);
//a("afterloe");
//b("afterloe");

// [1,2,3,4].forEach(__a => console.log(__a++));
``` 

### 变量解构、参数默认值

之前的声明变量都是`var`或`let`然后一行一个，引入解构之后我们可以按照一定规则来声明变量，在使用的时候按照一定规则获取即可。大大的方便了声明和获取，但是使用解构很容易造成无法一眼看出对应的值是什么，但是从执行效率来看解构是最快的，当然视项目而定

变量解构
> 按照一定模式，从数组和对象中提取值，对变量进行赋值，这被 称为解构  
> 数据结构具有 Iterator 接口的，都可以采用数组形式的解构赋值 ( Set ， Map ， String )  
> 如果等号右边是数值和布尔值，则会先转为对象  
> 用途很多  
>> 交换变量的值  
>> 从函数返回多个值   
>> 提取 JSON 数据  

> 推荐使用解构来给变量赋值  

```javascript
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
        let {name= "ORS",number="22",sex = 'nan'} = _obj;
        console.log(name,number,sex);
        console.log(_obj.name, _obj.number, _obj.sex);
};

//show(obj);
//show.apply(this,[obj]);
show();
// console.log(g,h,j);
```

### 模块

在以往的js开发的过程中，js是没有具体的模块概念，虽然后面开发了一些类似模块的组件库，但是使用起来还是很不容易，在Node中，采用了requireJS，通过require的方式来映入一些模块，让Node可以像java一样有了Jar包的概念。在Node里面，我们称他为Modules，Node提供了一个开源的公共Module库 -- [npm](https://npmjs.com)，可以在这里面搜索安装模块，当然安装也是很容易的安装node之后会有一个npm的类库，使用命令`npm install co`就可以安装一个名为co的模块。模块的使用更加方便，类似于接口一样

创建一个文件
```bash
$ echo "hello word" > input.txt;
```

同一位置编写一个js文件
```javascript
const fs = require("fs");

let data = fs.readFileSync("input.txt");
console.log(data.toString());
```

### 异步方法

在Node里面最常见的应该是异步方法，很多时候或很多场景之下他都推荐使用异步方法来降低io阻塞，同步方法会一行一行的执行，而异步方法则是一行执，不管是否完成或出现异常都接着执行下一行，等前一行一行结果出现之后在通知会线程，这种我们称之为异步非柱塞，这个概念会在后面的章节详细描述，这里我就掩饰下如何使用Node里的异步方法。

```javascript
const fs = require("fs");

fs.readFile("input.txt", (err, data) => {
	if (err) {
		console.error("has Error! -> " + err.message);
		return ;
	}

	console.log(data.toString());
});

console.log("主函数结束执行.");
```

### Network

Node 在网络服务上最厉害的是创建web服务，他可以用最少的代码就创建出一个web服务，而相对其他的语言，需要映入很多的额外的扩展包。所以在这里演示下如何使用Node来创建一个web服务,结合我们之前用的函数库写一个web服务用于读取当前目录的下的文件并输出到浏览器之上

```javascript
const [
	http,
	fs,
	querystring,
	url
] = [
	require("http"),
	require("fs"),
	require("querystring"),
	require("url")
];

/**
 * 输出文本
 *
 * @param 响应对象
 * @param 请求url
 */
const outFile = (res,_url) => {
        // 格式化url，获取query的内容
        _url = querystring.parse(url.parse(_url).query);
        // 申明请求的文件路径
        let [fsName,readStream] = [`${__dirname}/${_url.path}`];
        // 判断文件是否存在
        if(fs.existsSync(fsName)){
                // 如果存在则 创建输入流将数据输出到页面
                readStream = fs.createReadStream(fsName);
                readStream.pipe(res);
                return ;
        } else {
                // 不存在就输出 没有该文件
                res.write(`<script> alert("no such this file ${fsName}");</script>"`);
                res.end();
        }
};

/*
 * 创建server
 *
 * @param function (请求对象，相应对象)
 */
const server = http.createServer((request,response) => {
        // 输出的请求URL
        console.log(request.url);
        // 写状态码 HTTP 响应头
        response.writeHead(200, {
                // 页面编码
                "Content-Type" : "text/html;charset=UTF-8",
                // 响应头编码
                "charset" : "UTF-8",
                // 自定义响应头
                "X-Foo" : "bar"
        });
        // 输出响应内容
        outFile(response,request.url);
});

/**
 *  启动监听
 *
 *  @param 端口
 *  @param 主机名
 *  @param 监听成功之后的回调函数
 * */
server.listen(port,hostname, () => {
  console.log(`server is running in ${hostname}:${port}`);
});
```

## 总结

懒得写了，自己领悟吧
