# node.js
npm 笔记

> Copyright(c) afterloe. ISC Licensed  
> Version: v0.0.5  
> ModifyTime: 2016-12-3 11:07:43  
> Authors:
    afterloe <lm6289511@gmail.com> (https://github.com/afterloe)  
> Host:
    https://github.com/afterloe  

CommonJS 规范<small>完全符合CommonJS规范的包目录应该如下</small>  
package.json				包描述文件
bin							可执行二进制文件的目录
lib							存放javascript代码的目录
doc							存放文档的目录
test						存放单元测试的测试用例代码

package.json官方使用的key  
< name 包名，由小写字符和数字组成，可以包含.、_、-不允许出现空格，包名必须唯一
< description 包简介
< version 版本
< keywords 关键词数组，做分类搜索使用
< maintainers 包维护者列表，由name、email、web 三个属性标示
```bash
{
	"maintainers": [{"name":"afterloe","email":"lm6289511@gmail","web":"https://github.com/afterloe"}]
}
```
< contributors 贡献者列表，也就是协同开发人员列表，格式如上
< bugs 可以反馈bug的网页或邮箱
< licenses 许可证列表，标明该包在那些许可证下被使用
```bash
{
	"licenses":[{"type":"GPlv2", "ur"}]
}
```
< repositories 托管代码的位置列表
< dependencies 当前包运行时所需的依赖包


非必须:
< homepage 首页
< os 操作系统的支持列表
< cpu cpu架构的支持列表
< engine 支持js引擎列表
< builtin 是否是底层系统的标准组件
