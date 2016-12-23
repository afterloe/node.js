make 功能
===

> Copyright(c) afterloe. ISC Licensed  
> Version: v0.0.1  
> ModifyTime: 2016-12-22 11:07:43  
> Authors:
    afterloe <lm6289511@gmail.com> (https://github.com/afterloe)  
> Host:
    https://github.com/afterloe  

## Make 概述 
make命令用于将代码编程可执行的文件，这个过程成为**编译**。编译是具有顺序，优先编译哪一个这样的步骤称为**构建**。而Make是最常用的构建工具，起源于1977年的c语言项目。make命令是按照Makefile中的内容进行编译的顺序，所以如果没有Makefile使用make命令是无效的。

## Makefile 文件格式
Makefile是由一系列规则构成，每条规则的形式如下
```bash
<target> : <prerequisites>
[tab]	<commands>
```
* target 目标， 必须的，不可省略  
* tab 第二行必须由一个tab键起首，后面跟着命令  
* commands 命令  
* prerequisites 前置条件， 他和命令都是可选的，但是两者必须存在一个  

## target 目标
一个目标就是构成一条规则，目标通常是文件名，指明Make命令所构建的对象，目标也可以是多个文件名，使用空格分隔。  
除了文件名，还可以是某个操作的名字，这中目标被称为**伪目标**
```make
clean:
	rm *.js
```

不过伪目标也会存在问题，加入目录下有一个文件的名字和伪目标的代码一样，则make会发现文件以及存在了，就不再构建。为了避免这个问题就需要在makefile上申明这个是伪目标
```make
.PHONY: clean
clean:
	rm *.js temp
```

这样每次执行make命令的时候就绘制型命令了，[更多的内置目标名](http://www.gnu.org/software/make/manual/html_node/Special-Targets.html#Special-Targets)可以参考手册。因为缺少判断条件，当执行删除操作的时候文件不存在就会报一堆的错误，所以下一步应该编写好前提条件再执行make。

## prerequisites 前置条件
