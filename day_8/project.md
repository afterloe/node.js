Node 产品化
===

> Copyright(c) afterloe. ISC Licensed  
> Version: v0.0.1  
> ModifyTime: 2016-12-1 11:07:43  
> Authors:
    afterloe <lm6289511@gmail.com> (https://github.com/afterloe)  
> Host:
    https://github.com/afterloe  
   
构建之前，编写makefile，这是make命令的配置文件。
大致的构建任务如下

* 检查语法
* 编译模板
* 转码
* 合并
* 压缩
* 测试
* 删除源码

所有的任务的构建规则都写在makefile中，扩展命令，将常用命令扩展到PATH中，然后调用命令的时候就可以不用补全路径。
```makefile
PATH = node_modules/.bin:$$PATH
SHELL = /bin/bash
```

## 第一步检测语法
```makefile
js_files = $(shell find ./src -name '*.js')

lint: $(js_files)
	jshint $?
```

## 第二步编译模板
假设模板都在templates目录，需要编译为build目录下的templates.js文件
```makefile
build/templates.js: templates/*.handlebars
	mkdir -p $(dir $@)
	handlebars templates/*.handlebars > $@

template: build/templates.js
```

## 第三步转码
假设我们使用的是es7编码的文件，运行node是会出现很多问题的，所以这里是需要转码。转码规则采用banbel
```makefile
build/src: src/*.js
	babel src -d lib
	babel static/src -d static/javascripts 
build: build/src
```

## 第四步合并文件
将多余的文件进行合并，然后处理
```bash
js_files := $(wildchard build/*.js)
OUTPUT = build/bundle.js

concat: $(js_files)
	cat $^ > $(OUTPUT)
```

## 第五步压缩Javascript脚本
将所有的javascript压缩为build目录下的app.js
```makefile
app_bundle := build/app.js
$(app_bundle): $(build_files) $(template_js)
	uglifyjs -cmo $@ $^
min: $(app_bundle)
```
或另指定压缩工具的写法
```makefile
UGLIFY ?= uglifyjs
app_bundle := build/app.js
$(app_bundle): $(build_files) $(template_js)
	$(UGLIFY) -cmo $@ $^
```

## 第六步测试
```makefile
test_js := $(shell find ./test -name '*_test.js')
test: $(test_js)
	mocha $^
```

## 第七步删除临时构建文件
```makefile
.PHONY: clean
clean: build
	rm -rf build
```
