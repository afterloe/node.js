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
```makefile
clean:
	rm *.js
```

不过伪目标也会存在问题，加入目录下有一个文件的名字和伪目标的代码一样，则make会发现文件以及存在了，就不再构建。为了避免这个问题就需要在makefile上申明这个是伪目标
```makefile
.PHONY: clean
clean:
	rm *.js temp
```

这样每次执行make命令的时候就绘制型命令了，[更多的内置目标名](http://www.gnu.org/software/make/manual/html_node/Special-Targets.html#Special-Targets)可以参考手册。因为缺少判断条件，当执行删除操作的时候文件不存在就会报一堆的错误，所以下一步应该编写好前提条件再执行make。

## prerequisites 前置条件
前置条件通常是一组文件名，之间用空格分隔，他指定了目标是否冲型构建的判断标准。只要有一个前置文件不存在，或者有过更新，则目标就被执行。
```makefile
result.txt: source.txt
	cp source.txt result.txt
	more source.txt > result.txt
source.txt: 
	ps aux | grep afterloe > source.txt
```

## commands 命令
命令表示如何更新目标文件，由一行或多行的sell命令构成，他是构建目标的具体指令，运行结果通常就是生成目标文件。每行命令都在单独的一个shell中执行，这些shell没有继承关系。如果想把shell合并到一起可以采取如下写法
```makefile
var-lost:
	export foo=bar; echo "foo=[$$foo]"
```
或
```makefile
var-lost:
	export foo=ba; \
	echo "foo=[$$foo]"
```
再或
```makefile
.ONESHELL:
var-lost:
	export foo=bar;
	echo "foo=[$$foo]"
```

## makefile语法
使用#号表示注释，因为makefile每次执行都会打印出命令，如果不想把命令打印出，可以采用@符关闭
```makefile
# 测试注释
test:
	# 测试注释
	@# 不显示这个注释
	@echo TODO
```
通配符可以指定一组符合条件的文件名，makefile的通配符于bash一致，主要有星号(*)，问号(?)，和[...]  

### 模式匹配
允许对文件名进行类似正则运算的匹配，主要用的匹配符% 。
```makefile
%.o : %.c	
```
等同于
```makefile
f1.o: f1.c
f2.o: f2.c
```

### 变量与赋值符
自定义变量
```makefile
txt = Hello afterloe
test:
	@echo $(txt)
```

调用shell变量的时候需要再加一个美元符，因为makefile命令会对美元符进行转移
```makefile
test:
	@echo $$HOME
```

变量的值是可以指向另外一个变量
```makefile
txt = hello afterloe
v1 = $(txt)
test:
	@echo $(v1)
```

值得注意的是
```makefile
VARIABLE = value
# 在执行时扩展，允许递归扩展

VARIABLE := value
# 在定义时扩展

VARIABLE ?= value
# 只有在变量为空的时，才设置

VARIABLE += value
# 将值追加到变量的尾部
```

内置变量主要为了兼容跨平台，make添加了内置变量，该内置变量用于处理删除等不同平台的差异，详细的内置变量请[戳我](https://www.gnu.org/software/make/manual/html_node/Implicit-Variables.html)  
在makefile中还有一种名为自动变量，自动变量用于减少书写内容，部分自动变量介绍如下，详细请[戳我](https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html)  
* $@ 代表当前规则的规则名
* $< 代表当前规则下的第一个前置条件
* $? 代表比目标更加新的所有前置条件
* $^ 代表所有前置条件
* $* 代表匹配符%匹配的部分，比如%匹配的是f1.txt 那么$*就是 f1
* $(@D) $(@F) 分别代表当前规则指向的目录名和文件名例如 $@ 为 src/input.js $(@D) src $(@F) input.js
* $(<D) $(<F) 同上，不过指向的是第一个前置条件的目录和文件名

### makefile支持判断和循环，语法和bash一致

### makefile函数
```makefile
$(function arguments)
# 或
${function arguments}
```

官方提供了很多内置函数，详细请[戳我](https://www.gnu.org/software/make/manual/html_node/Functions.html)
