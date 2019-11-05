import React from 'react';
import './Dashboard.css';
import PartyPokemon from '../Components/Party/PartyPokemon';

class Dashboard extends React.Component {
  render(){
    return (
      <div className="Dashboard">
        <h1>Dashboard</h1>
        <div className='PartyContainer'>
          <PartyPokemon Pokemon='Pikachu'></PartyPokemon>
          <PartyPokemon Pokemon='Zapdos'></PartyPokemon>
          <PartyPokemon Pokemon='Mewtwo'></PartyPokemon>
          <PartyPokemon Pokemon='Tentacruel'></PartyPokemon>
          <PartyPokemon Pokemon='Jigglypuff'></PartyPokemon>
          <PartyPokemon Pokemon='Onix'></PartyPokemon>
        </div>
      </div>
    );
  }
}

export default Dashboard;
