import React from 'react';
import './App.css';
import Nav from '../Nav/Nav';
import About from '../About/About';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from '../Login/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav></Nav>
        <div className="content">
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/Login" component={Login}/>
            <Route path="/about" component={About}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

const Home = () => (
  <header className="App-header">
    <p>
      Welcome to the world of pokemon!
    </p>
    <a
      className="App-link"
      href="https://bulbapedia.bulbagarden.net/wiki/Nuzlocke_Challenge"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn about nuzlockes here
    </a>
  </header>
)

export default App;
