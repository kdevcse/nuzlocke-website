import React from 'react';
import './NuzzyRun.css';
import PartySlot, { Pokemon } from '../Components/Party/PartySlot';

export class NuzInfo{
  Party: Pokemon[];
  RunTitle: string;
  Version: string;
  Badges: number;

  constructor(party: Pokemon[], title: string, version: string, badges: number){
    this.Party = party;
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
        <PartySlot Poke={props.run.Party[0]} Route={'44'}></PartySlot>
        <PartySlot Poke={props.run.Party[1]} Route={'54'}></PartySlot>
        <PartySlot Poke={props.run.Party[2]} Route={'27'}></PartySlot>
        <PartySlot Poke={props.run.Party[3]} Route={'11'}></PartySlot>
        <PartySlot Poke={props.run.Party[4]} Route={'14'}></PartySlot>
        <PartySlot Poke={props.run.Party[5]} Route={'Saffron City'}></PartySlot>
      </div>
    </div>
  );
}

export default NuzzyRun;
