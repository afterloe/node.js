# node.js
node.js 异步调用和事件轮询 

> Copyright(c) afterloe. ISC Licensed  
> Version: v0.0.5  
> ModifyTime: 2016-12-4 11:07:43  
> Authors:
    afterloe <lm6289511@gmail.com> (https://github.com/afterloe)  
> Host:
    https://github.com/afterloe  

Node在事件调用的基础上采用了事件轮寻机制，该机制的优势在于不用上层开发者过多的关注于内存的切换和死锁问题。在开发上更加专注于业务，该机制在很多的系统中都有过运用，并不是Node的首创。需要了解什么是事件轮寻机制  

Node 的工作原理：  
Node单线程指的是javascript的执行线程是单线程，而底层是的采用线程池来实现的。所以不能理解为单线程来实现轮寻，当javascript线程调用异步任务的时候，会通知到核心模块(libuv)中的统一方法。libuv向上提供统一的方法，向下链接各个系统底层。当执行的系统是windows的时候libuv则采用IOCP的模型来实现事件轮寻、当执行系统是*nix系统的时候，libuv采用epoll的模型来实现事件轮寻。  

Window下异步任务的调度流程
- javascript封装方法
```javascript
const fs = require('fs');
fs.open(__path, funcs);
```
- 当js的执行线程调度到fs.open方法的时候，libuv就会执行一个名为方法QueueUserWorkItem()，该方法接收三个参数，第一个是调用底层的方法、第二个参数是该方法的参数列表、第三个就是该方法的执行状态。
- 当QueueUserWorkItem方法执行之后，等待线程池的轮寻，当线程池执行的时候，会取出第一个参数也就是执行的方法，然后注入第二个参数列表来执行，执行之后会将结果注入到第二个参数中，取名为result. req->result，最后调用PostQueueCompletionStatus方法，通知IOCP模型异步任务执行完毕，并提交任务状态。最后向线程池归还线程。
- 在IOCP层从queue中调用GetQueueComplateionStatus方法，获取到执行的结果也就是第三个参数，然后将结果提交给对应的观察者，由观察者调用回调方法完成异步任务。

当Node执行的时候，Node就会创建一个线程池，和一个事件轮询池，事件轮询池会创建一个主循环，等待观察者注入，然后等待事件触发，当接收到queue中的事件的时候，会查询是否由关联回调，有就执行，没有就跳过退出。然后主循环继续等待下一个事件。  

最后总结：  
	Node自身是多线程的，拥有线程池。不过执行javascript也就是用户行为代码的时候是单线程的，出列用户代码无法并行执行之外，所有的io都是可以同步并行的。核心关键词：事件轮讯、单执行线程、观察者模式、异步任务模型(IOCP,epoll)  

非I/O的异步API  
比如setTimeout、setInterval、setImmediate、process.nextTick等方法，这些在调度的时候是将方法和回调的句柄，写入到这些非I/O等异步操做写入到主循环的红黑树中(handles)中，当每次tick(事件轮询)的时候，就会先判断handles总是否存在任务，存在任务则进入到任务内部。判断时间是否达到，来决定是否执行回调方法。执行完回调之后再将任务从主循环的handle中移除。所以延时任务和定时任务是存在一定的时间误差。  

所以为了减少setTimeout等操作带来的性能开销，我们推荐使用process.nextTick方法来实现异步任务，在操作上更加轻量，这是将异步任务存入到调用队列，也就是queue中，不用经过红黑书的操作，时间复杂度更低，效率更高
```javascript
process.nextTick(() => console.log("i'm running!"));
```

setImmediate的结果和process.nextTick的结果是一样的，不过不同的是, 这两者是有优先级，具体的在观察者的不同，前者是将采用链表来存储，后者是数组。在调用的时候，每次循环setImmediate调用链表中的回调函数,而process.nextTick则是全部执行，所有优先级是process.nextTick第二是setImmediate.
