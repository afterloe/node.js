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

### 句柄传递
在node 0.5.9之后上层api能够将句柄发送给子进程，用于jianshao文件描述符浪费的问题。其实这只是上层的一个语法糖，在底层父进程发送给IPC的都是字符串，将句柄stringify化，并以NODE_为前缀，这个时候子进程接收到后会触发一个internalMessage的事件，取出message中的type值，加上描述文件重新生成一个句柄。所以Node之间的进程是不会传递对象的，而且也不是任意类型的句柄都可以传递，除非句柄拥有完整的发送，序列化和还原的过程。v8默认支持的句柄有net.Socket、net.Server、net.Native、dgram.Socket、dgram.Native5个对象。  
这样启动的服务就能够监听同一个端口，并进行抢占式的服务。

## 集群稳定
使用了句柄传递之后，可以迎接客户端大量的请求了。不过有一些细节是需要考量的。
> 性能问题  
> 多个工作进程的存活状态管理  
> 工作进程的平滑重启  
> 配置或静态数据的动态载入  
> 指定服务重启

子进程出现复发背负之创建，无法被杀死，无法发送消息时会触发***error***事件  
子进程被kill的时候***exit***事件会得到被杀死的信号第二个参数  
子进程标准输入输出流中止时会触发***close***事件  
父进程调用disconnect方法时会触发***disconnect***事件，之后会关闭监听的IPC通道  


