import React from 'react';
import './grid-layout.css';
import Menu from './components/menu.jsx';
import Main from './components/main.jsx';

class GridLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return [
      <div key="header" id="header" />,
      <div key="navi" id="navi">
        <Menu />
      </div>,
      <div key="sidebar" id="sidebar" />,
      <Main key='main' />,
      <div key="footer" id="footer" />
    ];
  }
}

module.exports = GridLayout;
