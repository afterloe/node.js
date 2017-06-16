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

class TimerInverted extends React.Component {
  constructor(props) {
    super(props);
    this["state"] = {now: props["start"], start: props["start"]};
  }

  tick() {
    this.setState((prevState, props) => {
      let counter = prevState["now"] - 1;
      return counter >= 0 ? {now: counter} : null;
    });
  }

  componentDidMount() {
    const step = this.props["step"] || 1;
    this.timerID = setInterval(() => this.tick(), 1 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const {now, start} = this["state"];
    return (
      <div>
        now this {now} over start {start};
      </div>
    );
  }
}

TimerInverted.defaultProps = {
  start : 10,
  step : 1
};

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.changeUserName = this.changeUserName.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.alertInput = this.alertInput.bind(this);
  }

  changeUserName(event) {
    const name = event.target.value;
    console.log('%s - %s', 'changeUserName', name);
    let state = {userName: name};
    state["userNameHasError"] = this['props']['userNameRegex'].test(name) ? "": "Error";
    this.setState(state);
  }

  changePassword(event) {
    const password = event.target.value;
    console.log('%s - %s', 'changePassword', password);
    let state = {password};
    state["passwordHasError"] = this['props']['passwordRegex'].test(password) ? "": "Error";
    this.setState(state);
  }

  alertInput(event) {
    const {userName, password} = this.state || {};
    console.log('will be submit by %s/%s', userName, password);
  }

  buildSubmitButton(userName, password) {
    const {userNameRegex, passwordRegex} = this['props'];
    const allowCommit = userNameRegex.test(userName) && passwordRegex.test(password);
    console.log('buildSubmitButton %s %s - %s', userName, password, allowCommit);
    return allowCommit? <input type='button' value='Submit' onClick={this.alertInput}/> : <input type='button' value='Submit' disabled onClick={this.alertInput}/>
  }

  render() {
    const {server} = this.props;
    const {userName, password, userNameHasError, passwordHasError} = this.state || {};
    return (
      <form method='POST' type='application/x-www-form-urlencoded' action= {server} >
          <p>
            登陆方式:
            <select defaultValue='phoneNum'>
              <option value='mail'>邮箱</option>
              <option value='phoneNum'>手机号</option>
              <option value='qq'>QQ</option>
              <option value='wechat'>微信</option>
            </select>
          </p>
          <p className={userNameHasError}>用户名: <input type='text' value={userName} placeholder='TMD 输入用户名!' onChange={this.changeUserName}/></p>
          <p className={passwordHasError}>密码: <input type='password' value={password}  placeholder='TMD 别忘了密码!' onChange={this.changePassword}/></p>
          <p>强行登陆: <input type='radio' name='stat' /> 是 <input type='radio' defaultChecked='true' name='stat' /> 否</p>
          <p>记住密码: <input type='checkbox' name='remberMe' defaultChecked='true' /></p>
          <p>倒计时: <TimerInverted start='5' step='1'/></p>
          <p>{this.buildSubmitButton(userName, password)}</p>
      </form>
    );
  };
}

SignIn.propTypes = {
  server: React.PropTypes.string,
  userNameRegex: React.PropTypes.object,
  passwordRegex: React.PropTypes.object
};

SignIn.defaultProps = {
  userNameRegex: /^[a-zA-Z0-9\+\.\_\%\-\+]{1,256}\@[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}(\.[a-zA-Z0-9][a-zA-Z0-9\-]{0,25})$/,
  passwordRegex: /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,16}$/
};

const href = '/home/reject';

ReactDOM.render(
  <SignIn server={href} />,
  document.getElementById('root')
);
