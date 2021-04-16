import Event, { EventTypes } from './event';

export default class CapturedEvent extends Event {
  capturedPokemon = '';
  nickname = null;
  location = null;

  constructor(pokemonObj) {
    super(EventTypes.CAPTURED, pokemonObj.caught);
    this.nickname = pokemonObj.nickname;
    this.location = pokemonObj.location;
    this.capturedPokemon = pokemonObj.real_name;
  }

}