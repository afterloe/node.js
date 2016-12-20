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

> 同步： 一次请求一个处理，只存在于无并发要求的应用中。QPS 1/N  
> 复制进程： 进程复制改进，使得更多的请求和用户得到服务，进程复制代价很大，需要复制进程内部的信息和状态。随着复制的进程增多，会导致内存的浪费和不必要的开销。该模型不具备伸缩性。QPS M/N  
> 多线程： 进程开启线程池，所有线程共用进程中的数据和信息，线程自己管控自己独立的堆栈。当并发量增大的同时，线程的数量会增多，CPU切分时间片，会频繁的切换线程执行。最终受到资源上线的影响。QPS M*L/N  
> 事件驱动：受限于CPU计算能力

单进程单线程对多核CPU利用率不足的问题是事件驱动的短板，理想状态下每个进程各自利用一个CPU，再启动线程池监听端口和服务。在node中，官方推出child_process模块。并且提供child_process.fork()方法来实现进程复制
