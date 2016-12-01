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
 *  组件手写字母必须大写,包含render方法输出组件,只能包含一个顶层标签.
 */
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

// 设置组件默认值
Welcome.defaultProps = {
  name: "joe"
};

// 默认值的类型
Welcome.propTypes = {
  name: React.PropTypes.string
};

const value = 22;

ReactDOM.render(
  <Welcome />,
  document.getElementById('root')
);
