import React from 'react';
import './App.css';
import Nav from '../Nav/Nav';
import About from '../About/About';
import { NuzzyRun, NuzInfo } from '../Dashboard/NuzzyRun';
import Dashboard from "../Dashboard/Dashboard";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../Components/Login/Login';
import data from '../Database/pokedex.json';
import { Pokemon } from '../Components/Party/PartySlot';

interface IState {
  runs: NuzInfo[];
}

function getRandomPokemon(floor: number): Pokemon{
  let id = Math.floor(Math.random() * floor);
  let t = "";
  for(let i = 0; i < data[id].type.length; i++){
    t += data[id].type[i];
    if (i + 1 < data[id].type.length)
      t += "/";
  }
  return {
    Name: data[id].name.english,
    Id: id + 1,
    Type: t,
    Nickname: "Bob",
    Level: Math.floor(Math.random() * 100) + 1
  }
}

class App extends React.Component<{}, IState>{
  //TODO: NuzzyRun route needs to be loaded dynamically
  
  constructor(props: any){
    super(props);
    this.state = {
      runs: [
        new NuzInfo(
          [
            getRandomPokemon(151),
            getRandomPokemon(151),
            getRandomPokemon(151),
            getRandomPokemon(151),
            getRandomPokemon(151),
            getRandomPokemon(151)
          ],
          "Kevin's NuzzyRun",
          "Red",
          6
        ),
        new NuzInfo(
          [
            getRandomPokemon(151),
            getRandomPokemon(151),
            getRandomPokemon(151),
            getRandomPokemon(151),
            getRandomPokemon(151),
            getRandomPokemon(151)
          ],
          "Other NuzzyRun",
          "Blue",
          4
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
