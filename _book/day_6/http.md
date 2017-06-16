# node.js
node.js HTTP服务  

> Copyright(c) afterloe. ISC Licensed  
> Version: v0.0.5  
> ModifyTime: 2016-12-4 11:07:43  
> Authors:
    afterloe <lm6289511@gmail.com> (https://github.com/afterloe)  
> Host:
    https://github.com/afterloe  
	
### Cookie  

Cookie 一旦被写入，每次请求都会被带回到服务器端，所以有几点需要注意一下的。
> 减小cookie的大小，非必须的数据没有必要写入到cookie中。  
> 静态组件使用不用的域名，突破浏览器下载线程的限制，cookie分离，使得业务相关的cookie不在受到静态资源的影响  

### Session  
这里讨论几种实现session的方案  
> 第一种Query字段方式，类似url?sessionId= ，这种方式带来的弊端很大应为一旦泄露，则会造成权限升级，一般在客户端禁止使用cookie的时候采用这种方案。  
> 第二种采用cookie作为口令，将sessionId写入到cookie中，每次传入进行校验。但是cookie会被泄露，所以写入的sessionId需要进行和secret一起进行盐值加密，然后进行校验保证安全。  
> 第三种是采用html5中的HTTP请求头ETag来实现，这种方式很强，就算切换电脑，浏览器写时无效的  
> Basic认证，该方式是将author信息写入到请求头，每次请求都会带上Authorization信息，由于采用的是base64转码，所以一般在https下使用。虽然有新的规范可以实现，但是没有测试过  

### 缓存使用方案
一般使用304返回码将资源返回给客户端使用本地版。  
缓存可以使用ETag(Entity Tag)，由服务端生成，根据文件内容生成散列值来决定是否采用304进行重定向。ETag的请求和响应式If-None-Match/ETag 
```javascript
const hash = getHash(file);
let noneMatch = req.headers('if-none-match');
if (hash === noneMatch) {
    res.writeHead(304, 'Not Modified');
} else {
    res.setHeader("ETag", hash);
    res.end(file);
}
```

但是这样还是要发起一次请求，会浪费带宽，更好设置可以参考下面的设置
```javascript
const handle = (req, res) => {
	fs.reaFile(path, (err, file) => {
		res.setHeader('Cache-Control', `max-age=${1000 * 60 * 60 * 24}`);
		res.writeHead(200, 'ok');
		res.end(file);
	});
};
```

### Basic认证
上面session中已经提到，这里是显示登录过程
```javascript
res.setHeader('WWW-Authenticate', 'Basic realm="Secure Ara"');
res.writeHead(401);
res.end();
```

在生成Basic的token的时候请写入一个摘要认证，一个随机数来保护系统，再生成token和session的时候也需要添加一个secret的摘要保护session安全。

### RESTful
标准的RESTful接口需要在请求端放置一个hook名为**Accept**来决定返回的数据格式是json还是xml。在响应的时候也需要添加响应头Content-Type来标识返回的数据类型
```javascript
{
	"Accept": "application/json application/xml",
	"Content-Type": "application/json application/xml"
}
```

### 中间件
使用高效的方法，必要时通过jsperf.com测试基准性能  
缓存需要重复计算结果，控制缓存用量  
避免不必要的计算  
合理使用路由和中间件  
