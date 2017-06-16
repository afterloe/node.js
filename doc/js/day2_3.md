# 基本RESTApi

里面用到一些没有讲解到的知识闭包、 url 处理、高阶函 数调用。这是一个入门级的 API DEMO ，由于我们用浏览器模拟的所以采用的是问号传 参，不符合标准。因为标准的是依靠请求的方式来区分的。

```javascript
/**
 *      RESTFul API DEMO
 *
 * @author      afterloe
 * @mail        afterloeliu@jwis.cn
 */
const [http,fs,url,querystring] = [require("http"),require("fs"),require("url"),require("querystring")];

const [hostname,port] = ["0.0.0.0",10032];

let printInfo = function(info){
        this.end(info);
};

let controller = (() => {
        // 用户数组
        let userList = new Array({id:1,name:"afterloe"},{id:2,name:"grace"});

        // 打印用户列表
        let printUserList = function(){
                this.write(JSON.stringify(userList));
                this.end();
        };

        // 创建用户
        let insert = (response,params) => {
                let {id,name} = params;
                if(!userList.find(user => user.id == id)){
                        userList.push({id,name});
                        // userLisst.push({id:id,name:name});
                        printUserList.apply(response);
                } else {
                        printInfo.call(response,`员工${id} 信息已经写入了！`);
                }
        };

        let update = (response,params) => {
                let {id,name} = params;
                Array.prototype.forEach.call(userList,user => id == user.id? user.name = name : null);
                printInfo.call(response,"更新结束");
        };

        let query = (response,params) => {
                let {id} = params;
                if(!id) {
                        printUserList.apply(response);
                }
                else {
                        let user = userList.find(u => u.id == id);
                        printInfo.call(response,user? JSON.stringify(user): `${id} 号员
工未找到`);
                }
        };

        let     deleteUser = (response,params) => {
                let {id} = params;
                let index = userList.findIndex(user => user.id == id);
                if(-1 !== index){
                        userList.splice(index,1);
                        printUserList.apply(response);
                } else {
                        printInfo.call(response,`${id} 号员工不在公司`);
                }
        };

        return {
                jwiinsert : insert,
                jwiupdate : update,
                jwiquery : query,
                jwidelete : deleteUser,
                getUserList : userList
        }
})();

let route = (response,reqUrl,params) => {
        let operation = reqUrl.split("/").join("");
        response.writeHead(200,{
                "Content-Type" : "text/html;charset=utf8",
                "charset" : "utf8"
        });
        if(controller[operation])
                controller[operation].call(null,response,params);
        else
                printInfo.call(response,"api 未支持");
};

let server = http.createServer((request,response) => {
        let reqUrl = url.parse(request.url);
        console.log(request.url);
        route.call(null,response,reqUrl.pathname,querystring.parse(reqUrl.query));
});

server.listen(port,hostname, () => console.log(`server is running in ${hostname}:${port}`));

```

而目前采用这种原生的写法已经很少了，基本都是借助框架来实现。

### Express

Express 是基于 Node.js 平台的一种，快速、开放、极简的 web 开发框架。

安装
```bash
$ npm init
$ npm install express –-save
```

> -- save 指的是在安装第三方的模块的时候会自动的写入到我们的 package.json 文件中

