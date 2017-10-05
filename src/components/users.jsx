import React from 'react';
import { Link } from 'react-router-dom';

const users = [{
  id: 1,
  name: 'Anneli',
},{
  id: 2,
  name: 'Jamppa',
},{
  id: 3,
  name: 'Paavo',
},{
  id: 4,
  name: 'Mo',
},{
  id: 5,
  name: 'Femma',
}];

class Users extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <div><b>Users</b></div>
      {users.map(u => (
        <Link key={u.id} to={`/users/${u.name}`}>{u.name}</Link>
      ))}
    </div>);
  }
}

module.exports = Users;
