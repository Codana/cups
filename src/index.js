import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // eslint-disable-line
import GridLayout from './grid-layout.jsx'; // eslint-disable-line

ReactDOM.render(
  <BrowserRouter>
    <GridLayout />
  </BrowserRouter>, document.getElementById('app'));
