import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

const a = () => alert("Default function here");

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className="button" onClick={this.props.onClick}>{this.props.label}</button>);
  }
}

Button.defaultProps = {
  label: 'Button',
  onClick: () => {a()}
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;