# node.js
socket 编程
===
> Copyright(c) afterloe. ISC Licensed  
> Version: v0.0.5  
> ModifyTime: 2016-12-5 11:07:43  
> Authors:  
    afterloe <lm6289511@gmail.com> (https://github.com/afterloe)  
> Host:  
    https://github.com/afterloe  

socket又称套接字，目前采用的是TCP/UDP 这样的传输层协议，这些协议工作在OSI模型中，而这种模型也是目前最通用的模型通讯模型。
OSI模型分为7层，由低到高依次为 物理层 链路层 网路层 传输层 会话层 表示层 应用层  
相对于各层的典型代表以此为 物理设备 链路接口 IP TCP/UDP 通讯链接/维持会话 加密/解密 HTTP/SMTP/IMAP  

TCP
###
TCP 是面向链接的协议，他的显著特点是在传输前三次握手来形成会话。
> 客户端发起一个链接请求，服务器响应  
> 客户端接收到响应之后，再发送一个开始传输的请求。 服务端响应  
> 正式数据交互  

TCP可以监听IP，也可以监听 Domain socket[本地文件]，然后可以进入通讯。具体可以参考src中的代码  

UDP
###
UDP 也是属于网络层的传输协议，不同的是TCP是面向链接的。TCP链接一旦建立，所有的会话都是基于链接完成的，如果客户端想与另一个TCPServer进行通讯，则需要再建一个socket来完成。而UDP则不需要，它可以调用send方法，给不同的UDP服务来发送信息。UDP提供面向事务的简单不可靠信息传输服务，在网络差的地方丢包率严重，适合应用在丢一两个数据包也不影响的场景，如视频音频，DNS服务。具体可以参考src中的代码

HTTP
###
HTTP 属于应用层协议，构建在socket之上，是典型的TCP应用  

HTTP服务主要分为三部分
> 第一部分 TCP三次握手 请求链接、尝试链接、链接完成数据传输  
> 第二部分 客户端向服务端发送请求报文(请求头，请求体等信息)  
> 第三部分 服务端处理完成之后想客户端发送响应内容(响应头，响应体等信息)
> 第四部分 会话结束，TCP关闭链接
