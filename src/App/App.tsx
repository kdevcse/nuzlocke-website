import React from 'react';
import './App.css';
import Nav from '../Nav/Nav';
import About from '../About/About';
import NuzzyRun from '../Dashboard/NuzzyRun';
import Dashboard from "../Dashboard/Dashboard";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from '../Components/Login/Login';

function App() {
  //TODO: NuzzyRun route needs to be loaded dynamically

  return (
    <Router>
      <div className="App">
        <Nav></Nav>
        <div className="content">
          <Switch>
            <Route path="/" exact component={Dashboard}/>
            <Route path="/dashboard" exact component={Dashboard}/>
            <Route path="/dashboard/NuzlockeRun1" exact component={NuzzyRun}/>
            <Route path="/login" component={Login}/>
            <Route path="/about" component={About}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
