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

const scaleName = {
  c : 'Celsius',
  f : 'Fahrenheit'
};

class BoilingVerdict extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const celsius = this["props"]["celsius"];
        return celsius >= 100?
        (
          <p>The water would boil.</p>
        ) : (
          <p>The water would not boil.</p>
        );
    }
}

class TemperatureInput extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this['props'].onChange(event['target']['value']);
    }

    render() {
        const [value, scale] = [this['props']['value'], this['props']['scale']];
        return (
          <fieldset>
            <legend>Enter temperature in {scaleName[scale]} : </legend>
            <input value={value} onChange={this.handleChange} />
          </fieldset>
        );
    }
}

/**
*   组件的onChange 事件中的value是不用从event.target.value 这个方法来获取的
*/
class Calcuator extends React.Component {

    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {scale: 'c', value : ''};
    }

    static toCelsius(fahrenheit) {
        return (fahrenheit -32) * 5 / 9;
    }

    static toFahrenheit(celsius) {
        return (celsius * 9 / 5) + 32;
    }

    static tryConvert(value, convert) {
        const input = Number.parseFloat(value);
        if (Number.isNaN(input))
          return '';
        const output = convert(input);
        const rounded = Math.round(output * 1000) / 1000;
        return rounded.toString();
    }

    handleCelsiusChange(value) {
        this.setState({scale: 'c', value});
    }

    handleFahrenheitChange(value) {
        this.setState({scale: 'f', value});
    }

    render() {
        const scale = this['state']['scale'];
        const value = this['state']['value'];
        const celsius = 'f' === scale ? Calcuator.tryConvert(value, Calcuator.toCelsius) : value;
        const fahreheit = 'c' === scale ? Calcuator.tryConvert(value, Calcuator.toFahrenheit) : value;

        return (
          <div>
            <TemperatureInput scale='c' value={celsius} onChange={this.handleCelsiusChange}/>
            <TemperatureInput scale='f' value={fahreheit} onChange={this.handleFahrenheitChange}/>
            <BoilingVerdict celsius={Number.parseFloat(celsius)} />
          </div>
        );
    }
}

ReactDOM.render(
  <Calcuator devic="phone"/>,
  document.getElementById('root')
);
