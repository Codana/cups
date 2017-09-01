import React from 'react';
import './button.css';

class Button extends React.Component {
  render() {
    return <button className="button">{this.props.label}</button>;
  }
}

export default Button;