node Thead 
===

> Copyright(c) afterloe. ISC Licensed  
> Version: v0.0.1  
> ModifyTime: 2016-12-1 11:07:43  
> Authors:
    afterloe <lm6289511@gmail.com> (https://github.com/afterloe)  
> Host:
    https://github.com/afterloe  
   
## 服务模型变迁史 

### 同步
一次请求一个处理，只存在于无并发要求的应用中。QPS 1/N  
### 复制进程
进程复制改进，使得更多的请求和用户得到服务，进程复制代价很大，需要复制进程内部的信息和状态。随着复制的进程增多，会导致内存的浪费和不必要的开销。该模型不具备伸缩性。QPS M/N   
### 多线程
进程开启线程池，所有线程共用进程中的数据和信息，线程自己管控自己独立的堆栈。当并发量增大的同时，线程的数量会增多，CPU切分时间片，会频繁的切换线程执行。最终受到资源上线的影响。QPS M*L/N  

### 事件驱动
受限于CPU计算能力

> 单进程单线程对多核CPU利用率不足的问题是事件驱动的短板，理想状态下每个进程各自利用一个CPU，再启动线程池监听端口和服务。在node中，官方推出child_process模块。并且提供child_process.fork()方法来实现进程复制，这里使用childe_process的目的是为了充分利用多核CPU而不是提高并发量。

## 创建子进程的几种方式

### spawn
启动一个子进程来执行命令  
### exec
启动一个子进程来执行命令，有接口获取子进程的状态  
### execFile
启动一个子进程来执行可执行文件,这个比较坑，需要指定运行文件的引擎，如果是bash，则要指定/bin/bash，在参数的位置传入shell脚本路径执行。否则回报一个spawn的错误，如果不指定则需要在执行的shell脚本首部添加内容，并修改权限。
```bash
#! /bin/bash

$ chmod 755 path_shell
```
这些完成之后再执行js就能够正确执行脚本，否则需要指定执行脚本引擎。  
如果是node的执行文件，需要在首行添加
```bash
#! /usr/bin/env node
```  
### fork
创建Node子进程来执行javascript文件模块  

##  进程间的通讯
在chrome中，执行线程里js和渲染是同步进行的也就是说执行js的时候会停止渲染，渲染的时候会停止js的执行，当执行很大的js的时候会出现页面的卡顿，为了解决这种卡顿，chrome引入WebWorker API来辅助解决，将大运算的js放到其他线程上运行，然后通过线程间的通讯来完成。
```javascript
var worker = new Worker('worker.js');
worker.onmessage = function(event){
	console.log(event['data']);
};


// worker.js
// - found a prime
postMessage(data);
```
主线程和工作线程依靠onmessage 和 postMessage 进行通讯。传递是消息而不是共享或者发送资源，所以是一种较为轻量和松耦合的做法。其底层的实现也就是child_process.execFile 或 child_process.fork 的形式，只不过是在调用层加了函数的监听，和绑定了异步回调函数。而在node中，多进程之间的通许是使用IPC(inter-process communication)通道实现的，父子进程之间通过message和send来传递消息。  

ipc 在node中依靠libuv来实现，在windows中，libuv使用的命名管道来实现(name pipe)，在unix中采用 Unix Domain Socket来实现。  

### 原理
在父进程创建子进程之前，会先创建IPC管道，并监听。然后真正创建子进程，并通过环境变量(NODE_CHANNEL_FD)来通知子进程IPC通道的描述文件，当子进程启动的时候就会去链接这个描述文件并连接上已存在的IPC通道，完成父子进程之间的链接。这是node采用fork的原理，其他开启子进程的方式是无法取读取IPC通道的，除非双方约定好并创建IPC通道，否则是无法进行数据交互的。
