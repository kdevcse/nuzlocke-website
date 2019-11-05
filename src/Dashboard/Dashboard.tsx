import React from 'react';
import './Dashboard.css';
import PartyPokemon from '../Components/Party/PartyPokemon';

interface PokemonParty{
  First: string;
  Second: string;
  Third: string;
  Fourth: string;
  Fifth: string;
  Sixth: string;
}

class Dashboard extends React.Component<PokemonParty> {
  state: PokemonParty;
  constructor(props: PokemonParty){
    super(props);
    this.state = {First: 'Pikachu', Second: 'Zapdos', Third: 'Mewtwo', Fourth: 'Tentacruel', Fifth: 'Jigglypuff', Sixth: 'Onix'};
  }
  componentDidMount(){
    setInterval(() => {
      if(this.state.First === 'Pikachu'){
        this.setState({First: 'Charmander'});
      } else {
        this.setState({First: 'Pikachu'});
      }
    },10000);
  }
  render(){
    return (
      <div className="Dashboard">
        <h1>Dashboard</h1>
        <div className='PartyContainer'>
          <PartyPokemon Pokemon={this.state.First}></PartyPokemon>
          <PartyPokemon Pokemon={this.state.Second}></PartyPokemon>
          <PartyPokemon Pokemon={this.state.Third}></PartyPokemon>
          <PartyPokemon Pokemon={this.state.Fourth}></PartyPokemon>
          <PartyPokemon Pokemon={this.state.Fifth}></PartyPokemon>
          <PartyPokemon Pokemon={this.state.Sixth}></PartyPokemon>
        </div>
      </div>
    );
  }
}

export default Dashboard;
