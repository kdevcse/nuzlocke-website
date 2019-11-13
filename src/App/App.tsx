import React from 'react';
import './App.css';
import Nav from '../Nav/Nav';
import About from '../About/About';
import { NuzzyRun, NuzInfo } from '../Dashboard/NuzzyRun';
import Dashboard from "../Dashboard/Dashboard";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../Components/Login/Login';

interface IState {
  runs: NuzInfo[];
}

class App extends React.Component<{}, IState>{
  //TODO: NuzzyRun route needs to be loaded dynamically
  
  constructor(props: any){
    super(props);
    this.state = {
      runs: [
        new NuzInfo(['Pikachu','Zapdos','Mewtwo','Tentacruel','Jigglypuff','Onix'],
          "Kevin's NuzzyRun",
          "Blue",
          6
        ),
        new NuzInfo(['Pikachu','Zapdos','Mewtwo','Tentacruel','Jigglypuff','Onix'],
          "Some other run",
          "Blue",
          6
        ),
      ]
    };
  }

  render(){
    return (
      <Router>
        <div className="App">
          <Nav runs={this.state.runs}/>
          <div className="content">
            <Switch>
              <Route path="/" exact render={() => <Dashboard runs={this.state.runs}/>}/>
              <Route path="/dashboard" exact render={() => <Dashboard runs={this.state.runs}/>}/>
              <Route path="/dashboard/:runid" exact render={({match}) => <NuzzyRun run={this.state.runs.find(x => x.RunTitle === match.params.runid)}/>}/>
              <Route path="/login" component={Login}/>
              <Route path="/about" component={About}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
