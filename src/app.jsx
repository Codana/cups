import React from 'react';
import ReactDOM from 'react-dom';
import Button from './components/button.jsx';
import Toolbar from './components/toolbar.jsx';
import Form from './components/form.jsx';
import List from './components/list.jsx';
import Menu from './components/menu.jsx';
import './app.css';

class App extends React.Component {
  state = {
    counter: 0,
    isToolbarVisible: true
  };

  handleClick = () => {
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
      isToolbarVisible: !prevState.isToolbarVisible
    }));
    /*
    this.setState((prevState, props) => ({
      count: prevState.count + props.increment
    }));
    */
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
        <Menu />
        <br />
        <Button
          id='first_button'
          label={'Button clicks: ' + this.state.counter}
          onClick={this.handleClick}
          ondblclick={this.reset}
          onWheel={this.wheeling}
        />
        <Toolbar isVisible={this.state.isToolbarVisible} />
        <Form label='Forminen' />
        <List />
      </div>
    );
  }
}

export default App;