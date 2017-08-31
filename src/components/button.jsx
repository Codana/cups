import React from 'react';

class Button extends React.Component {
  render() {
    return <button className="button-info" label={this.props.label} />;
  }
}

export default Button;