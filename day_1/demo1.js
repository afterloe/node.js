// 引入http包
const [http,fs,querystring,url] = [require("http"),require("fs"),require("querystring"),require("url")];

// 监听主机的ip，端口
const [hostname,port] = ["0.0.0.0",10032];

/**
 * 输出文本
 * 
 * @param 响应对象
 * @param 请求url
 */
let outFile = (res,_url) => {
	// 格式化url，获取query的内容
	_url = querystring.parse(url.parse(_url).query);
	// 申明请求的文件路径
	let [fsName,readStream] = 
		[`${__dirname}/${_url.path}`];
	// 判断文件是否存在
	if(fs.existsSync(fsName)){
		// 如果存在则 创建输入流将数据输出到页面
		readStream = fs.createReadStream(fsName);
		readStream.pipe(res);
		return ;
	} else {
		// 不存在就输出 没有该文件
		res.write(`<script> alert("no such this file ${fsName}");</script>"`);
		res.end();
	}
};

/*
 * 创建server
 *
 * @param function (请求对象，相应对象)
 */
let server = http.createServer((request,response) => {
	// 输出的请求URL 
	console.log(request.url);
	// 写状态码 HTTP 响应头
	response.writeHead(200, {
		// 页面编码
		"Content-Type" : "text/html;charset=UTF-8",
		// 响应头编码
		"charset" : "UTF-8",
		// 自定义响应头
		"X-Foo" : "bar"
	});
	// 输出响应内容
	outFile(response,request.url);
});

/**
 *  启动监听
 *
 *  @param 端口
 *  @param 主机名
 *  @param 监听成功之后的回调函数
 * */
server.listen(port,hostname, () => {
  console.log(`server is running in ${hostname}:${port}`);
});
