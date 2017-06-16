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
* 基于状态机的组件交互
*
*   当每次调用setState之后,React都会自动调用render
*   this.props 与 this.state 的区别是 前者一旦定义则不在改变. 后者随着用户互动而修改的变
* 化特效
*/
class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.changeSelect = this.changeSelect.bind(this);
    this.state = {like: true};
  }

  changeSelect() {
    this.setState({
      like: !this.state.like
    });
  }

  render(){
    const text = this.state.like? 'i like' : 'i don\'t like this';
    return (
      <p>
        {text}
        <button onClick={this.changeSelect}>click To change</button>
      </p>
    );
  }
}

ReactDOM.render(
  <LikeButton />,
  document.getElementById('root')
);
