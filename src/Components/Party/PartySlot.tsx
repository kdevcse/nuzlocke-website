import React from 'react';
import './PartySlot.css';

export interface Pokemon {
    Name: string,
    Id: number,
    Type: string
    Nickname: string,
    Level: number,
    Image: string
}

class PartySlot extends React.Component<{Poke:Pokemon, Route: string}> {
    render() {
        return (
            <div className="party-slot">
                <img className="party-slot-img" src={require(`../../Database/thumbnails/${this.props.Poke.Image}.png`)}/>
                <div className="party-slot-info">
                    <h2 className="party-slot-title">{this.props.Poke.Name}</h2>
                    <p className="party-slot-type">{this.props.Poke.Type}</p>
                    <p className="party-slot-level">Lvl. {this.props.Poke.Level}</p>
                    <p className="party-slot-level">Route: {this.props.Route}</p>
                    <p className="party-slot-level">Nickname: {this.props.Poke.Nickname}</p>
                </div>
            </div>
        );
  }

  getImgName(num: number) {
      if (num < 10)
          return `00${num}`;
      else if (num < 100)
          return `0${num}`;
      else
          return num.toString();
  };
  
}

export default PartySlot;