import React from 'react';
import { string, func, bool } from 'prop-types';
import './button.css';

const a = () => alert('Default function here');

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button type='button'
              disabled={this.props.isDisabled}
              id={this.props.id}
              className='button'
              onClick={this.props.onClick}>
        {this.props.label}
      </button>);
  }
}

Button.defaultProps = {
  label: 'Button',
  onClick: () => {a()},
  isDisabled: false,
  className: '',
  iconName: '',
};

Button.propTypes = {
  id: string.isRequired,
  label: string,
  onClick: func.isRequired,
  isDisabled: bool,
  className: string,
  iconName: string,
};

export default Button;