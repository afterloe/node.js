# 文件操作

## 文件复制
文件复制的时候推荐使用的是管道流，而且管道流是可以形成链式流。完成很一系列复杂的操作，比如文件的压缩和解压。如果是`writeStream` 和 `readStream` 就比较复杂，但是也存在使用的场景。比如文件的加密或者接受控制台的输出和第三方数据的交互显示

```javascript
/**
 *      文件复制
 *
 * @author      afterloe
 * @mail        afterloeliu@jwis.cn
 */

const fs = require("fs");

// 解构输出 命令， 获取参数
const [cmd,js,source,target,encoding = "UTF8"] = process.argv;

// 判断输入的文件是否存在
if(fs.existsSync(source)){
        // 解构创建流
        let [readStream,writeStream] = [fs.createReadStream(source),fs.createWriteStream(target)];
        // 管道
        readStream.pipe(writeStream);

        // 监听输出流的关闭事件
        writeStream.on("close",() => {
                console.log(`File ${source} copy success`);
        });
}
```
## 修改响应头完成图片下载

原理：文件或图片下载也是一种管道流，说白了就是图片复制。

```javascript
/**
 *      图片 + 简介 展示
 *
 * @author      afterloe
 * @mail        afterloeliu@jwis.cn
 */
const [http,fs,url] = [require("http"),require("fs"),require("url")];

const [hostname,port] = ["0.0.0.0",10032];

// 图片下载
let picDown = res => {
        res.writeHead(200, {
                // 注意响应体
                "Content-Type" : "application/octet-stream;charset=UTF-8",
                // 响应体编码
                "charset" : "UTF-8"
        });
        // 将本地文件流写入到页面
        let readStream = fs.createReadStream("/home/afterloe/Firefox_wallpaper.png");
        readStream.pipe(res);
};

let html = (res,reqUrl) => {
        res.writeHead(200,{
                "Content-Type" : "text/html;charset=UTF-8",
                "charset" : "UTF-8"
        });
        // 模板方法
        res.end(`
<html lang="en">
        <head>
                <meta charset="UTF-8"/>
                <title>哈哈哈 网页</title>
        </head>
        <body>
                <img src="/down/img" alt="测试图片" style="max-height:150px;max-width:300px"/>
                <p>监听服务器名 ${hostname}</br>
                环境变量 ${process.env.HOME}</br>
                请求路径 ${reqUrl.pathname}</p>
        </body>
</html>`);
};

let server = http.createServer((request,response) => {
        // 获取请求的url
        let reqUrl = url.parse(request.url);
        // 根据url来进行不同的操作
        if("/down/img" === reqUrl.pathname)
                picDown.call(server,response);
        else
                html.call(server,response,reqUrl);
});

server.listen(port,hostname, () => console.log(`server is running in ${hostname}:${port}`));
```

这里面使用到了函数模版，按照不同的响应头来响应页面。在 text/html 中显示 html。
