import React from 'react';
import PropTypes from 'prop-types';
import './input.css';

class Input extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input id={'input--'+this.props.name}
             name={this.props.name}
             className='input'
             placeholder={this.props.placeholder}
             onChange={this.props.onChange}
             disabled={this.props.disabled}
      />);
  }
}

Input.defaultProps = {
  placeholder: '',
  value: '',
  onChange: () => {},
  disabled: false,
};

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Input;