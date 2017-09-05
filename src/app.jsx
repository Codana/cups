import React from 'react';
import Button from './components/button.jsx';
import Toolbar from './components/toolbar.jsx';
import './app.css';

class App extends React.Component {
  state = {counter: 0};

  handleClick = () => {
    this.setState((prevState) => ({
      counter: prevState.counter + 1
    }));
  };

  reset = () => this.setState(state);

  wheeling = (e) => {
    if(e.deltaY>0) {
      alert("up");
    }
  };

  render() {
    return (
      <div className="container">
        <Button
          label={"Button clicks: " + this.state.counter}
          onClick={this.handleClick}
          ondblclick={this.reset}
          onWheel={this.wheeling}
        />
        <Toolbar />
      </div>
    );
  }
}

export default App;