import React from 'react';
import { string, func, bool } from 'prop-types';
import './list.css';

const rivit = [
  {name: 'Antti', age: 43},
  {name: 'Jamppa', age: 69},
  {name: 'Anneli', age: 99},
];

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='grid'>
      <div className='header-row'>
        {this.props.title}
      </div>
        {rivit.map(p => <ListRow key={p.name} name={p.name} age={p.age} />)}
      </div>);
  }
}

class ListRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className='row'>
      <div className='name-column'>{this.props.name}</div>
      <div className='age-column'>{this.props.age}</div>
    </div>);
  }
}

List.defaultProps = {
  title: 'oletuslista',
};

List.propTypes = {
  title: string,
};

export default List;