Node 工程化
===

> Copyright(c) afterloe. ISC Licensed  
> Version: v0.0.1  
> ModifyTime: 2016-12-23 11:07:43  
> Authors:
    afterloe <lm6289511@gmail.com> (https://github.com/afterloe)  
> Host:
    https://github.com/afterloe  
	
## 目录结构规范化

目录规范可以以common.js规范进行扩展如下结构可以借鉴
```json
{
	"History.md": "项目改动历史",
	"INSTALL.md": "安装说明",
	"Makefile": "Makefile文件",
	"benchmark": "基准测试用例",
	"routes": "路由",
	"interceptors": "拦截器组",
	"package.json": "包描述文件",
	"test": "单元测试用例代码",
	"bin": "可执行二进制或脚本文件",
	"tools": "工具",
	"doc":"项目文档目录",
	"views": "视图动态模板",
	"README.md": "项目介绍文件",
	"main.js": "主进程",
	"config": "项目配置目录",
	"slave.js": "工作进程",
	"static": "项目静态资源目录",
	"lib": "没有模块化的文件目录",
	"service": "服务层",
	"dao": "数据持久层"
}
```

## 构建工具
推荐使用make进行构建，因为开发基本和运行基本基于Unix进行的。所以使用make具有较稳定的服务和使用。makefile中包含部分基本命令，install、test、test-cov、clean、build、uninstall、update、

## 编码规范
使用JSLint，在build的过程中进行代码规范的审查。

## 代码评审
merge代码的时候需要对提交的代码进行审核，失败的话需要重新更新代码。成功则并入分支，随后重新构建并进行单元测试和覆盖率测试输出结果。再进行编包进行基准测试，出包后进入压力测试生成测试报告。

## 上线部署
提供完善的控制应用的脚本，包括启动，停止，重启等操作。如果有必要可以编译成短命令进行控制。

## 日志系统
编写完善的访问日志系统，还原现场问题。将异常日志进行分级编写和处理，日志堆栈也需要进行存储。

## 监控报警
需要对日志，响应时间，进程，磁盘，内存，CPU占用，CPU load，I/O负载，网络，应用状态，DNS进行监控，如果出现问题第一时间触发报警机制。线上最优采用语音电话，或者短信。邮件是基础的了。