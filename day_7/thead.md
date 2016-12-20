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
