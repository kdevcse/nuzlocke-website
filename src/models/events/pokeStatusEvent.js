import Event, { EventTypes } from './event';

export default class PokeStatusEvent extends Event {

  constructor(pokemonObj, eventType) {
    switch(eventType) {
      case EventTypes.CAPTURED:
        super(EventTypes.CAPTURED, pokemonObj.caught);
        this.html = this.getCapturedHtmlTxtFromPokemonObj(pokemonObj);
        break;
      case EventTypes.DEATH:
        super(EventTypes.DEATH, pokemonObj.death);
        this.html = this.getDeathHtmlTxtFromPokemonObj(pokemonObj);
        break;
      case EventTypes.LVLUP:
        super(EventTypes.LVLUP, Date.now());
        this.html = this.getLvlUpHtmlTxtFromPokemonObj(pokemonObj);
        break;
      case EventTypes.EVOLVED:
        super(EventTypes.EVOLVED, Date.now());
        this.html = this.getEvolveHtmlTxtFromPokemonObj(pokemonObj);
        break;
      default:
        super();
        break;
    }
  }

  getCapturedHtmlTxtFromPokemonObj(pokemonObj) {
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

  getDeathHtmlTxtFromPokemonObj(pokemonObj) {
    const nicknameTxt = pokemonObj.nickname ? ` (${pokemonObj.nickname}) ` : '';
    var pokeName = pokemonObj.real_name.charAt(0).toUpperCase() + pokemonObj.real_name.slice(1) + nicknameTxt;

    return `<strong class='highlighted-txt'>${pokeName}</strong> was defeated`;
  }

  getLvlUpHtmlTxtFromPokemonObj(pokemonObj) {
    const nicknameTxt = pokemonObj.nickname ? ` (${pokemonObj.nickname}) ` : '';
    var pokeName = pokemonObj.real_name.charAt(0).toUpperCase() + pokemonObj.real_name.slice(1) + nicknameTxt;

    return `<strong class='highlighted-txt'>${pokeName}</strong> grew to <strong>Lvl. ${pokemonObj.lvl}</strong>`;
  }
  
  getEvolveHtmlTxtFromPokemonObj(pokemonObj) {
    const nicknameTxt = pokemonObj.nickname ? ` (${pokemonObj.nickname}) ` : '';
    var pokeName = pokemonObj.real_name.charAt(0).toUpperCase() + pokemonObj.real_name.slice(1) + nicknameTxt;

    return `<strong class='highlighted-txt'>${pokeName}</strong> has evolved`;
  }
}