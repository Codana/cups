import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Users from './users.jsx';
import Matches from './matches.jsx';
import NotFound from './404.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    console.log('main constructor');
  }

  render() {
    console.log('main render');
    return (<div key="main" id="main">
        <Switch>
          <Route exact path="/users" component={Users} />
          <Route exact path="/matches" component={Matches} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default Main;