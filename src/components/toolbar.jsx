import React from 'react';
import './toolbar.css';

class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      top: 0,
      left: 10,
    };
  }

  handleWheel = e => {
    const delta = (e.deltaY<0 ? 30 : -30);
    this.setState((prevState, props) => ({
      top: prevState.top + delta
    }));
  };

  render() {
    const css = {
      position: 'relative',
      top: this.state.top + 'px',
      left: this.state.left + 'px',
      display: this.props.isVisible ? 'block' : 'none'
    };
    return <div id='toolbar' style={css} className='toolbar' onWheel={this.handleWheel} />;
  }
}

export default Toolbar;