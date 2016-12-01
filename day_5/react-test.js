/**!
 * tru.jwis.cn - public/javascripts/public.js
 *
 * Copyright(c) afterloe.
 * ISC Licensed
 *
 * Create Date: 16-11-4
 * Authors:
 *   afterloe <afterloeliu@jwis.cn> (http://blog.sina.com.cn/afterloe)
 */
"use strict";

/**
 * 第一个React DEMO
 *
 */
ReactDOM.render(
  <h1>hello world</h1>,
  document.getElementById('root')
);

/**
 * 第二个React DEMO
 *
 */
const indexList = [{
    name: '首页',
    href: '/'
}, {
    name: '应用',
    href: '/application'
}, {
    name: 'DEMO',
    href: 'http://127.0.0.1:5003/demo.html'
}, {
    name: '内容',
    href: '/skip/content'
}, {
    name: '关于TRU',
    href: '/skip/aboutTru'
}];

ReactDOM.render(
  <div>
  {
    indexList.map(index => <p>{index["name"]} - {index["href"]}</p>)
  }
  </div>,
  document.getElementById('root')
);

/**
 * 第三个React DEMO
 *
 */
const jsxArray = [
  <h1>Hello world!</h1>,
  <h2>React is awesome</h2>];

ReactDOM.render(
  <div>{jsxArray}</div>,
  document.getElementById('root')
);
