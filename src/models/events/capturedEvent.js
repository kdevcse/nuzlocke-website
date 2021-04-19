import Event, { EventTypes } from './event';

export default class CapturedEvent extends Event {

  constructor(pokemonObj) {
    super(EventTypes.CAPTURED, pokemonObj.caught);
    this.html = this.getHtmlTxtFromPokemonObj(pokemonObj);
  }

  getHtmlTxtFromPokemonObj(pokemonObj) {
    const nicknameTxt = pokemonObj.nickname ? ` (${pokemonObj.nickname}) ` : '';
    var pokeName = pokemonObj.real_name.charAt(0).toUpperCase() + pokemonObj.real_name.slice(1) + nicknameTxt;

    if (!pokemonObj.location)
      return `<strong class='highlighted-txt'>${pokeName}</strong> was captured`;
    
    const dashSplit = pokemonObj.location.split('-');
    let locationStr = '';
    dashSplit.forEach(split => {
      locationStr += (split.charAt(0).toUpperCase() + split.slice(1)) + ' ';
    });

    return `<strong class='highlighted-txt'>${pokeName}</strong> was captured at <strong>${locationStr}</strong>`;
  }
}