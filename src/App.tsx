import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import './App.css';

import About from './common/components/about';
import Footer from './common/components/footer';
import Nav from './common/components/nav';

import Projects from './projects/components/projects';

export const App = () => (
  <div className="App d-flex flex-column">
    <Nav/>
    <div className="content">
      <div className="container">
        <Switch>
          <Redirect exact={true} from="/" to="/projects"/>
          <Route path="/projects" component={Projects}/>
          <Route path="/about" component={About}/>
        </Switch>
      </div>
    </div>
    <Footer/>
  </div>
);

export default App;
