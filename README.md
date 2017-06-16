node.js 教学代码&&ppt
===

> Copyright(c) afterloe. MIT Licensed  
> Version: v0.0.4  
> ModifyTime: 2016-12-1 11:07:43  
> Authors:
    afterloe <lm6289511@gmail.com> (https://weibo.com/afterloe)  
> Host:
    https://weibo.com/afterloe  

## Overview 

文档入门处，将在每章都写下创建内容，同时可以在连接处查看代码

day_1 javascript基础，node基本使用  
day_2 数组使用，文件，restful API  
day_3 promise与 genreator 推导式  
day_4 babel编码器的使用  
day_5 react demo  
day_6 node详细解析  
day_7 node集群   
day_8 产品化&规范化  

## Warning
直接运行对应天数中的代码可能会存在路径之类的问题，当对应天数的文件夹下存在lib的时候，请运行lib下的js。
```bash
$ cd day_7
$ cd lib
$ node master.js
```
后续大多数代码采用ecmascript 2016+ 编写，源码在对应天数的src/src目录下，使用npm可以修改代码并重新编译运行
```bash
$ cd day_7/src
$ npm run build
```
编译完成后返回到lib目录，就可以按照上述方法运行脚本
