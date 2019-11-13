import React from 'react';
import './NuzzyRun.css';
import PartySlot from '../Components/Party/PartySlot';

export class NuzInfo{
  Pokemon: string[];
  RunTitle: string;
  Version: string;
  Badges: number;

  constructor(party: string[], title: string, version: string, badges: number){
    this.Pokemon = party;
    this.RunTitle = title;
    this.Version = version;
    this.Badges = badges;
  }
}

export function NuzzyRun(props: any){
  return (
    <div className="nuzzy-run">
      <h1 className="run-title">{props.run.RunTitle}</h1>
      <div className="version">
        <b>Version: </b><span>{props.run.Version}</span>
      </div>
      <div className="badges">
        <b>Badges: </b><span>{props.run.Badges}</span>
      </div>
      <h3>Current Party:</h3>
      <div className='party-container'>
        <PartySlot Pokemon={props.run.Pokemon[0]} Type={'Electric'} Level={34} Route={'44'} Nickname={'Daisy'}></PartySlot>
        <PartySlot Pokemon={props.run.Pokemon[1]} Type={'Electric/Flying'}Level={42} Route={'54'} Nickname={'Wondo'}></PartySlot>
        <PartySlot Pokemon={props.run.Pokemon[2]} Type={'Psychic'}Level={57} Route={'27'} Nickname={'Wario'}></PartySlot>
        <PartySlot Pokemon={props.run.Pokemon[3]} Type={'Poison/Water'}Level={23} Route={'11'} Nickname={'Mario'}></PartySlot>
        <PartySlot Pokemon={props.run.Pokemon[4]} Type={'Normal'}Level={67} Route={'14'} Nickname={'Luigi'}></PartySlot>
        <PartySlot Pokemon={props.run.Pokemon[5]} Type={'Rock'} Level={99} Route={'Saffron City'} Nickname={'Falc'}></PartySlot>
      </div>
    </div>
  );
}

export default NuzzyRun;
