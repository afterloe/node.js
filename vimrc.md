# node.js
node.js 教学代码 ppt

> Copyright(c) afterloe. ISC Licensed  
> Version: v0.0.4  
> ModifyTime: 2016-12-1 11:07:43  
> Authors:
    afterloe <lm6289511@gmail.com> (https://github.com/afterloe)  
> Host:
    https://github.com/afterloe  

下面介绍 下VIM的命令

整行补全(自动补全上一行的内容)
```bash
ctrl+x ctrl+l
```

文件名(需要使用文件路径)
```bash
ctrl+x ctrl+f
```

当前文件中的关键字
```bash
ctrl+x ctrl+n 
#
ctrl+x ctrl+p
```

大范围查询和补全
```bash
ctrl+n
或
ctrl+p
```

字典补全,他查找到的是某些*.dict 文件，在.vimrc 中配置的
```bash
ctrl+x ctrl+k
```

语义补全
```bash
ctrl+x ctrl+o
```

tern_for_vim  
ternjs 专门为tern做的补全js, 安装步骤
```bash
afterloe@ubuntu:~/.vim$ mkdir bundle
afterloe@ubuntu:~/.vim$ cd bundle
afterloe@ubuntu:~/.vim$ git clone git@github.com:ternjs/tern_for_vim.git
afterloe@ubuntu:~/.vim$ cd tern_for_vim
afterloe@ubuntu:~/.vim/tern_for_vim$ npm install
```

使用
```bash
afterloe@ubuntu:~/project/studyNode$ touch .tern-project
afterloe@ubuntu:~/project/studyNode$ vim .tern-project

{
  "ecmaVersion": 6,
  "libs": [],
  "plugins": {
    "complete_strings": {
      "maxLength": 15
    },
    "node": {
      "dontLoad": "",
      "load": "",
      "modules": ""
    },
    "modules": {
      "dontLoad": "",
      "load": "",
      "modules": ""
    },
    "es_modules": {
	},
    "requirejs": {
      "baseURL": "",
      "paths": "",
      "override": ""
    },
    "commonjs": {
	}
  }
}
```

ESLint使用  
```bash
afterloe@ubuntu:~/project/studyNode$ npm install -g eslint
afterloe@ubuntu:~/project/studyNode$ npm install -g eslint-config-airbnb
afterloe@ubuntu:~/project/studyNode$ npm install -g eslint-plugin-jsx-a11y
afterloe@ubuntu:~/project/studyNode$ npm install -g eslint-plugin-react
afterloe@ubuntu:~/project/studyNode$ eslint --init
afterloe@ubuntu:~/project/studyNode$ vim .eslintrc
{
	"rules": {
		"semi": ["error", "always"],
		"quotes": ["error", "double"]
	}
}
```
