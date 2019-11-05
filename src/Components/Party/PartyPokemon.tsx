import React from 'react';
import './PartyPokemon.css';

class PartyPokemon extends React.Component<{Pokemon:string}> {
    render(){
        return (
            <div className="PartyPokemon">
                <p>{this.props.Pokemon}</p>
            </div>
        );
  }
}

export default PartyPokemon;