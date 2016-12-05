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

