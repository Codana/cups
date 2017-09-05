import React from 'react';
import './toolbar.css';

class Toolbar extends React.Component {
  handleWheel = e => {
    console.log((e.deltaY<0 ? 'Up' : 'Down'));
  };

  render() {
    const css = {
      position: 'relative',
      top: '30px'
    };
    return <div style={css} className="toolbar" onWheel={this.handleWheel} />;
  }
}

export default Toolbar;