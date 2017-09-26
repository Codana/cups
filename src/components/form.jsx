import React from 'react';
import { string } from 'prop-types';
import Button from './button.jsx';
import './form.css';

const COLORS = ['#ffffff', '#eeeeee', '#dddddd', '#cccccc'];

class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    const id = e.target.id;
    this.setState((prevState) => ({
      backgroundColor: COLORS[id] || 'red',
    }));
  };

  render() {
    const list = [
      { name: 'X', id: 0 },
      { name: 'A', id: 1 },
      { name: 'B', id: 2 },
      { name: 'C', id: 3 },
      { name: 'D', id: 4 },
      { name: 'E', id: 5 }
    ];

    const els = list.map(row => {
      return (
        <Button id={row.id.toString()}
          label={'Button ' + row.name}
          key={row.id.toString()}
          onClick={this.handleClick}
        />);
    });

    return (
      <div id='form' className='form' style={this.state}>
        {this.props.label}
        <div />
        {els}
      </div>);
  }
}

Form.defaultProps = {
  label: 'Formi',
};

Form.propTypes = {
  label: string.isRequired,
};

export default Form;