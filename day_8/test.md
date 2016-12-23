单元测试
===

> Copyright(c) afterloe. ISC Licensed  
> Version: v0.0.1  
> ModifyTime: 2016-12-1 11:07:43  
> Authors:
    afterloe <lm6289511@gmail.com> (https://github.com/afterloe)  
> Host:
    https://github.com/afterloe  

## 单元测试的意义
我理解的单元测试就是验证和证明自己的想法和代码是正确的，能够完成业务目标的代码。如果不进行单元测试，又如何保证产品在后续的迭代中的质量？所以我们需要编写可测试代码

* 单一职责：一个server或则一段函数只做一件事，将多余的职责进行分离。项目才能像搭积木一样进行扩展。
* 接口抽象：一个接口完成一套业务逻辑，无论底层如何变动，都不能影响到测试接口的测试代码。
* 层次分离：其实是单一职责的扩展，只有分层之后才能对每层的内容进行测试和组装。

## 单元测试的介绍
在node的环境中，单元测试主要包含断言、测试框架、测试用例、测试覆盖率、mock、持续集成、异步代码测试、私有代码测试。  

### 断言
就是if-else的官方说法，在node的断言测试中，可以使用assert模块
```javascript
import {equal} from 'assert';
equal(Math.max(1, 100), 100);
```
上面代码执行之后，当执行的结果不等于100的时候就会抛出异常。

断言库
* ok 判断结果是否为真
* equal 判断结果和预期的结构是否一致
* notEqual 与上面的相反
* deepEqual 结果是否是深度（数组，对象）相等
* strictEqual 相当于 ===
* throws 判断代码块是否抛出异常
* doesNotThrow 判断代码块是否没有抛出异常
* ifError 判断值是否为假，为假直接抛出异常

目前市面上的测试框架大多基于assert进行封装。  

### 测试风格
分为 TDD BDD 两种，前者是测试区动开发，后者是行为驱动开发。TDD所关注的所有功能是否被正确实现，每一个功能都该具备对应的测试用例。BDD所关注整体行为是否符合预期，适合自顶向下的设计方式。在表达方式上，TDD偏向功能说明书的风格，而BDD则像自然语言的习惯。

#### BDD
测试用例偏向使用describe it进行组织，describe描述多层级结构，具体测试用例的时候使用it，it中使用断言。同时还提供4个hook方法，before、after、beforeEach、afterEach。用于协助describe中测试用例的准备，安装，卸载，回收等工作。before、 after在进入和退出describe时触发， beforeEach、afterEach则在进入退出每一个it时触发。

#### TDD
测试用例偏向使用suite test进行组织，suite描述多层级结构，具体测试用例使用test，test中使用断言。但是只提供2个hook方法，setup、teardown效果等同于BDD中的before和after

### 测试用例
一个测试用例中最少要包含一个断言。一个测试用例最少要有通过正向测试和反向测试来保证对功能的覆盖，同时还有异步和超时的测试用例

### 测试覆盖率
通过不断补全代码的测试用例，将会不断覆盖代码的分支和不同的情况，测试覆盖率是单元测试中一个很重要的指标，即包括整体的覆盖率也能统计到行的覆盖率。  
统计覆盖率的工具为 jscover
```bash
$ npm install jscover
```
假设完成之后的代码都放在lib下，调用
```bash
$ jscover lib lib-cov
```
这个命令会将lib下的所有的js编译到lib-cov，编译后的内容会统计每一行代码被执行了多少次。为了正确得到测试覆盖率，必须运行测试用例时的代码是编译之后的代码。

### mock 测试
mock测试是模拟网络，权限等非输入性问题出现的异常。推荐muk 模块
```bash
$ npm install muk --save-dev
```
使用
```javascript
import fs from 'fs';
import muk from 'muk';

before(() => {
	muk(fs, 'readFileSync', (path, encoding) => throw new Error('mock readFileSync error'));
});

// it();

after(() => {
	muk.restore();
});
```

调用之后使用restore恢复修改即可，要小心是否将异步方法模拟成功。

### 私有方法测试
对于模块中未exports 方法，可以使用 rewire模块进行测试
```javascript
var lib = rewire('index.js');
var limit = lib.__get__('limit');
// ... done
```

## 持续集成
可以采用make方案来进行持续基础测试

## 性能测试
检测功能是否满足生产环境，能够承担实际业务带来的压力。

### 基准测试
推荐使用 benchmark 进行基准测试
```javascript

```

### 压力测试
常用工具是 ab siege http_load
```bash
$ ab -c 10 -t http://127.0.0.1:8001
```
表示10个用户持续3秒向服务器发起请求
