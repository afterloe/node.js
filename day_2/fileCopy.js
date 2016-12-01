/**
 *	文件复制
 *
 * @author 	afterloe
 * @mail	afterloeliu@jwis.cn
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
