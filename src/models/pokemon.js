export default class Pokemon {
  img_url = null;
  real_name = '';
  nickname = '';
  gender = -1;
  pokemon_id = null;
  lvl = 1;
  location = '';
  types = [];
  stats = [];
  evolutions = [];
  party = -1;
  caught = Date.now();
  death = null;
  id = null;
  
  get object() {
    return Object.assign({}, this);
  }

  setValuesFromApiResultSet(realName, sprites, generation, version, pokeId, stats, types) {
    this.real_name = realName;
    this.img_url = this.getPokeImgUrl(sprites, generation, version);
    this.pokemon_id = pokeId;
    this.stats = stats.map(s => {
      return {
        name: s.stat.name,
        val: s.base_stat
      };
    });
    this.types = types.map(t => {
        return t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1);
    });
  }

  setValuesFromPokeDataObj(pokeData) {
    if (!pokeData) {
      return;
    }

    this.img_url = pokeData.img_url ?? null;
    this.real_name = pokeData.real_name ?? '';
    this.nickname = pokeData.nickname ?? '';
    this.gender = pokeData.gender ?? -1;
    this.pokemon_id = pokeData.pokemon_id ?? null;
    this.lvl = pokeData.lvl ?? 1;
    this.location = pokeData.location ?? '';
    this.types = pokeData.types ?? [];
    this.stats = pokeData.stats ?? []
    this.evolutions = pokeData.evolutions ?? [];
    this.party = pokeData.party ?? -1;
    this.caught = pokeData.caught ?? Date.now();
    this.death = pokeData.death ?? null;
    this.id = pokeData.id ?? null;
  }

  getPokeImgUrl(sprites, generation, version) {
    if (!sprites || !generation || !version) {
      return null;
    }

    const gens = sprites.versions[generation];
    const versionKey = Object.keys(gens).find(o => o.includes(version));

    return gens[versionKey] ? gens[versionKey].front_default : sprites.front_default;
  }
}