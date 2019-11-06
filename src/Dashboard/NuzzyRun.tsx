import React from 'react';
import './NuzzyRun.css';
import PartySlot from '../Components/Party/PartySlot';

interface NuzInfo{
  First: string;
  Second: string;
  Third: string;
  Fourth: string;
  Fifth: string;
  Sixth: string;
  RunTitle: string;
  Version: string;
  Badges: number;
}

class NuzzyRun extends React.Component<NuzInfo> {
  state: NuzInfo;
  constructor(props: NuzInfo){
    super(props);
    this.state = {
      First: 'Pikachu', 
      Second: 'Zapdos', 
      Third: 'Mewtwo', 
      Fourth: 'Tentacruel', 
      Fifth: 'Jigglypuff', 
      Sixth: 'Onix',
      RunTitle: 'FirstNuzzy',
      Version: 'Blue',
      Badges: 3,
    };
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
      <div className="nuzzy-run">
        <h1 className="run-title">{this.state.RunTitle}</h1>
        <div className="version">
          <b>Version: </b><span>{this.state.Version}</span>
        </div>
        <div className="badges">
          <b>Badges: </b><span>{this.state.Badges}</span>
        </div>
        <h3>Current Party</h3>
        <div className='party-container'>
          <PartySlot Pokemon={this.state.First} Type={'Electric'} Level={34} Route={'44'} Nickname={'Daisy'}></PartySlot>
          <PartySlot Pokemon={this.state.Second} Type={'Electric/Flying'}Level={42} Route={'54'} Nickname={'Wondo'}></PartySlot>
          <PartySlot Pokemon={this.state.Third} Type={'Psychic'}Level={57} Route={'27'} Nickname={'Wario'}></PartySlot>
          <PartySlot Pokemon={this.state.Fourth} Type={'Poison/Water'}Level={23} Route={'11'} Nickname={'Mario'}></PartySlot>
          <PartySlot Pokemon={this.state.Fifth} Type={'Normal'}Level={67} Route={'14'} Nickname={'Luigi'}></PartySlot>
          <PartySlot Pokemon={this.state.Sixth} Type={'Rock'} Level={99} Route={'Saffron City'} Nickname={'Falc'}></PartySlot>
        </div>
      </div>
    );
  }
}

export default NuzzyRun;
