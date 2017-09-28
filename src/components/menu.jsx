import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    console.log('menu constructor');
  }

  componentDidMount() {
    let klikutin = e => alert(e.target);
    let link = document.getElementById('klik');
    link.addEventListener('click', klikutin, false);
  }

  render() {
    console.log('Menu render');
    return (
      <div className="router">
        <Link to="/">Home</Link>
        <Link id='klik' to="/another">Another</Link>
        <Link to="/topics">Topics</Link>
        <Link to="/users">Users</Link>
        <Link to="/matches">Matches</Link>
      </div>
    );
  }
}

export default Menu;