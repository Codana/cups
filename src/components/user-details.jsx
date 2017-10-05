import React from 'react';
import Input from './input.jsx';
import NotFound from './404.jsx';

const users = [
  {
    vintage: 1974,
    name: 'Anneli',
  },{
    vintage: 1985,
    name: 'Jamppa',
  },{
    vintage: 1942,
    name: 'Paavo',
  },{
    vintage: 1969,
    name: 'Mo',
  },{
    vintage: 1955,
    name: 'Femma',
  }
];

class UserDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  // ToDo.md: check username
  isNameUnique = (e) => {
    const txt = e.target.value;
    return users.filter(u => u.name !== this.props.match.params.id)
      .every(u => u.name.toLowerCase() !== txt.toLowerCase());
  };

  findUser = () => users.find(u => u.name === this.props.match.params.id);

  render() {
    const user = this.findUser();
    return (
      <div>
        <div>User details</div>
        <div>{user && user.name}</div>
        <div>{user && user.vintage}</div>
        <Input placeholder='Username' value='arvo' onchange={this.isNameUnique} />
        <div>{!user && <NotFound />}</div>
      </div>
    );
  }
}

module.exports = UserDetails;
