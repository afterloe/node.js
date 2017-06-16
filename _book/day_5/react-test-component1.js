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

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
      console.log(this); // MyComponent - object
      // console.log(e);
      alert("click me!");
  }

  // render() {
  //   return (
  //     <div>
  //       <input type="text" ref="myTextInput" />
  //       <input type="button" value="Focus the text input" onClick = {e => this.handleClick(e)} />
  //     </div>
  //   );
  // }

  render() {
    return (
      <div>
        <input type="text" ref="myTextInput" />
        <input type="button" value="Focus the text input" onClick = {this.handleClick} />
      </div>
    );
  }

}

ReactDOM.render(
  <MyComponent />,
  document.getElementById('root')
);
