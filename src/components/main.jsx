import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Users from './users.jsx';
import UserDetails from './user-details.jsx';
import Matches from './matches.jsx';
import NotFound from './404.jsx';

const user = {
  name: 'Antti',
};

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div key="main" id="main">
        <Switch>
          <Route exact path="/users" component={Users} />
          <Route path="/users/:id" component={UserDetails} />
          <Route exact path="/matches" component={Matches} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default Main;