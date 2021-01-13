export default class Pokemon {
    img_url = null;
    real_name = '';
    nickname = '';
    pokemon_id = null;
    lvl = 1;
    location = '';
    types = null;
    stats = null;
    evolutions = [];
    party = -1;
    caught = Date.now();
    death = null;
    
    get object() {
        return Object.assign({}, this);
    }
}