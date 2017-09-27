import React from 'react';
import './grid-layout.css';
import Menu from './components/menu.jsx';

class GridLayout extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return [
        <div key="header" id="header" />,
        <div key="navi" id="navi"><Menu /></div>,
        <div key="sidebar" id="sidebar" />,
        <div key="main" id="main" />,
        <div key="footer" id="footer" />
    ];
  }
}

module.exports = GridLayout;
