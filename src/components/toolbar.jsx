import React from 'react';
import './toolbar.css';

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    top: 30
  };

  handleWheel = e => {
    const delta = (e.deltaY<0 ? 30 : -30);
    this.setState((prevState, props) => ({
      top: prevState.top + delta
    }));
  };

  componentWillMount() {
    console.log('mounting...');
  }

  componentWillUnmount() {
    console.log('unmounting...');
  }

  render() {
    const css = {
      position: 'relative',
      top: this.state.top + 'px',
      display: this.props.isVisible ? 'block' : 'none'
    };
    return <div id='toolbar' style={css} className='toolbar' onWheel={this.handleWheel} />;
  }
}

export default Toolbar;