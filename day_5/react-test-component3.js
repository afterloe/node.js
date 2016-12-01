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

const indexs = ['首页', '应用', 'DEMO', '内容', '关于TRU'];
//
// const indexListLiList = indexs.map(index => <li>{index}</li>);
//
// ReactDOM.render(
//   <ul>{indexListLiList}</ul>,
//   document.getElementById('root')
// );

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.buildIndexListLi = this.buildIndexListLi.bind(this);
  }

  buildIndexListLi(){
    const indexList = this['props']['indexList'];
    return indexList.map((item, index) => <li id={index}>{item}</li>);
  }

  render(){
    const indexListLi = this.buildIndexListLi();
    return (
      <ul>{indexListLi}</ul>
    );
  }
}

Navbar.propTypes = {
  indexList : React.PropTypes.array
};

Navbar.defaultProps = {
  indexList : []
};

ReactDOM.render(
  <Navbar indexList={indexs}/>,
  document.getElementById('root')
);
