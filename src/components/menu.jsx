import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import Button from './button.jsx';
import NotFound from './404.jsx';
import { Sidebar, Burp } from './Sidebar.jsx';
import './menu.css';

class Menu extends React.Component {

  componentDidMount() {
    let klikutin = e => alert(e.target);
    let link = document.getElementById('klik');
    link.addEventListener('click', klikutin, false);
  }

  render() {
    const Home = () => <div>Homee</div>;
    const About = () => <div>Anotherr</div>;
    const jee = ({ match }) => {
      console.log("jeeeeee");
      console.log(match.params.id);
      return (<div>{match.params}</div>);
    };

    const Topic = ({ match }) => {
      return (<div>
        <Sidebar/>
        <Button id='topic-button' />
        <p><NavLink activeClassName='active-link' to={`${match.url}/jee`}>Sus</NavLink></p>
        <p><NavLink activeClassName='active-link' to={`${match.url}/666`}>iivil</NavLink></p>
        <Route path={`${match.url}/:id`} render={({ match }) => <div>{`${match.params.id}`}</div>} />
      </div>);
    };

    return (<Router>
      <div className="router">
        <p><Link to="/">Home</Link></p>
        <p><Link id='klik' to="/another">Another</Link></p>
        <p><Link to="/topic">Topiikki</Link></p>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/another" component={About} />
          <Route path="/topic" component={Topic} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>);
  }
}

export default Menu;