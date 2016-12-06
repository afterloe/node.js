# node.js
node.js 笔记

> Copyright(c) afterloe. ISC Licensed  
> Version: v0.0.5  
> ModifyTime: 2016-12-3 11:07:43  
> Authors:
    afterloe <lm6289511@gmail.com> (https://github.com/afterloe)  
> Host:
    https://github.com/afterloe  

Node与Chrome的区别：  
	Chrome中包含 HTML 标签解析器，Webkit布局引擎(css)，显卡支持  
	Node中不包含以上的内容，他拥有一个中间层(libuv)，通过libuv实现网卡硬盘等硬件的访问  

在2012年，出现了node-webkit项目，该项目改写了libuv，实现了HTML标签解析其和Webkit布局引擎以及显卡的支持。这也就是桌面开发工具的原型，而atom-shell就是改写node-webkit实现的，才有了后来的electron。  

单线程的优点：  
单线程无法和其他线程共享任何资源和状态，不需要时时注意线程的同步问题、不存在死锁带来的额外性能开销、也没有了线程上下文交换带来的线程开销
缺点：  
无法利用多核CPU、出现错误会导致整个应用退出，健壮性不如多线程的优异、大量的计算，或执行javascript会使占用的CPU过高最终导致无法继续调用异步I/O，已经完成的异步任务的回调函数也会因为该影响导致执行不够即使，在前端中也就相对于渲染被终止。 

在前端的坑中，可以采用web workers来分发计算或占用大量内存的计算的任务，使用消息传递的方式来传递运行结果，前生是Google的Gears。c++ 拓展也是可以借用libuv实现跨平台。  
长时间的运行计算(比如大循环)导致CPU时间片不能释放，使得后续I/O无法发起，可以适当调整和分解大型运算任务为多个小任务，使得运算能够适时释放，不阻塞I/O调用，这样就能解决计算密集型的应用  

Node的几个使用场景：  
- 前后端编程语言统一
- 实时应用的实现，websocket
- 并行I/O，高效利用分布式环境、利用稳定接口提升web渲染能力
- 云平台拓展
- 游戏开发领域 pomelo实时框架，应用在游戏和高是实时应用中
- 工具类应用

NPM:  
  关键字 author、bin、main、devDependencies,script
- author 包作者
- bin 一些包的作者希望包可以作为命令行工具使用，通过npm install -g package_name 就可以将脚本添加到执行路径中，然后使用命令行就能直接执行。node-gyp就是这样使用的
- main 当包被引入的时候会优先以该字段所标明的脚本为主脚本，如果缺省的话就是index.js、index.node、index.json 为默认入口
- devDependencies 开发环境依赖使用 npm install --save-dev 进行默认写入
- script hook命令，当使用npm install 时会优先执行preinstall指向的脚本，而后script中的标明的install脚本才会被依次加载执行。同理，uninstall标明的脚本也会被执行。test的时候指向的就是配置好的测试命令

```json
{
	"script": {
		"preinstall": "",
		"install": "",
		"uninstall": "",
		"test":""
	}
}
```

NPM是可以本地安装的，只要标示出package.json 文件的目录即可  
```bash
npm install <tarball file>
npm install <tarball url>
npm install <folder>
```

NPM 修改package源
```bash
npm config set registry http://registry.url
```

NPM 发布包规则
```bash
npm install
npm adduser
npm publish .
```

NPM 包管理权限：  
通常来说一个包只有一个人拥有圈钱进行发布，如果需要多人进行发布，需使用下列命令来查看，添加，删除包的管理者
```bash
npm owner ls <package name>
npm owner add <user> <package_name>
npm owner rm <user> <package_name>
```

包分析工具名，使用分析工具可以找出所有包，并生成依赖树
```bash
npm list 
#或
npm ls
```
