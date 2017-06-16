js编码规范
===

> Copyright(c) afterloe. ISC Licensed  
> Version: v0.0.1  
> ModifyTime: 2016-12-23 11:07:43  
> Authors:
    afterloe <lm6289511@gmail.com> (https://github.com/afterloe)  
> Host:
    https://github.com/afterloe  
	
参考自[es6 编程规范](http://es6.ruanyifeng.com/#docs/style)  
## 作用域
使用块级作用域
let 取代 var  
全局常量和线程安全  

## 字符串
静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号。  

## 解构赋值
使用数组成员对变量赋值时，优先使用解构赋值。  
函数的参数如果是对象的成员，优先使用解构赋值。  
如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。  

## 对象
单行定义的对象，最后一个成员不以逗号结尾。  
多行定义的对象，最后一个成员以逗号结尾。  
对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用Object.assign方法  
如果对象的属性名是动态的，可以在创造对象的时候，使用属性表达式定义。  

## 数组
使用扩展运算符（...）拷贝数组  

## 函数
立即执行函数可以写成箭头函数的形式。  
需要使用函数表达式的场合，尽量用箭头函数代替  
箭头函数取代Function.prototype.bind，不应再用self/_this/that绑定 this。  
简单的、单行的、不会复用的函数，建议采用箭头函数。如果函数体较为复杂，行数较多，还是应该采用传统的函数写法。  
所有配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数。  
不要在函数体内使用arguments变量，使用rest运算符（...）代替。因为rest运算符显式表明你想要获取参数，而且arguments是一个类似数组的对象  
使用默认值语法设置函数参数的默认值。  

## Map结构
只有模拟现实世界的实体对象时，才使用Object。如果只是需要key: value的数据结构，使用Map结构。  

## Class
用Class，取代需要prototype的操作。  
使用extends实现继承  

## 模块
使用import取代require。  
使用export取代module.exports。  
如果模块只有一个输出值，就使用export default，如果模块有多个输出值，就不使用export default，不要export default与普通的export同时使用  
不要在模块输入中使用通配符。  
如果模块默认输出一个函数，函数名的首字母应该小写。  
如果模块默认输出一个对象，对象名的首字母应该大写。  