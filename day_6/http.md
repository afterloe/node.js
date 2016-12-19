# node.js
node.js HTTP服务  

> Copyright(c) afterloe. ISC Licensed  
> Version: v0.0.5  
> ModifyTime: 2016-12-4 11:07:43  
> Authors:
    afterloe <lm6289511@gmail.com> (https://github.com/afterloe)  
> Host:
    https://github.com/afterloe  
	
Cookie  
###
Cookie 一旦被写入，每次请求都会被带回到服务器端，所以有几点需要注意一下的。
> 减小cookie的大小，非必须的数据没有必要写入到cookie中。  
> 静态组件使用不用的域名，突破浏览器下载线程的限制，cookie分离，使得业务相关的cookie不在受到静态资源的影  
Session  
###
这里讨论几种实现session的方案  
> 第一种Query字段方式，类似url?sessionId= ，这种方式带来的弊端很大应为一旦泄露，则会造成权限升级，一般在客户端禁止使用cookie的时候采用这种方案。  
> 第二种采用cookie作为口令，将sessionId写入到cookie中，每次传入进行校验。但是cookie会被泄露，所以写入的sessionId需要进行和secret一起进行盐值加密，然后进行校验保证安全。  
> 第三种是采用html5中的HTTP请求头ETag来实现，这种方式很强，就算切换电脑，浏览器写时无效的  
> Basic认证，该方式是将author信息写入到请求头，每次请求都会带上Authorization信息，由于采用的是base64转码，所以一般在https下使用。虽然有新的规范可以实现，但是没有测试过  

缓存使用方案
###
一般使用304返回码将资源返回给客户端使用本地版。  
缓存可以使用ETag(Entity Tag)，由服务端生成，根据文件内容生成散列值来决定是否采用304进行重定向。ETag的请求和响应式If-None-Match/ETag 
```javascript
const hash = getHash(file);
let noneMatch = req.headers('if-none-match');
if (hash === noneMatch) {
    res.writeHead(304, 'Not Modified');
} else {
    res.setHead("ETag", hash);
    res.end(file);
}
```
