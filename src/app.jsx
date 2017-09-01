import React from 'react';
import Button from './components/button.jsx';
import './app.css';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Button label="Add button" /> Oujee
      </div>
    );
  }
}

export default App;