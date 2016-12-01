/**
 *	图片 + 简介 展示
 *
 * @author 	afterloe
 * @mail 	afterloeliu@jwis.cn
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
