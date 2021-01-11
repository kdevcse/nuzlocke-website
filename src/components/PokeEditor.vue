<template>
  <b-modal
    centered
    size="lg"
    id="edit-poke-window"
    title="Edit a Pokemon"
    :ok-disabled="!form.valid"
    ok-title="Edit"
    ok-variant="success"
    @ok="handleOk"
    @cancel="unsetPokemonInEdit"
    @show="resetForm">
    <PokeCard
      id="example-pokecard"
      :pokedata="form"
      demo>
    </PokeCard>
    <b-form
      ref="form"
      class="form-container">
      <b-input-group>
        <div class="form-option-container">
          <label for="edit-pokemon-name-input">Pokemon Name:</label>
          <b-form-input
            id="edit-pokemon-name-input"
            v-model="pokename"
            :state="nameIsValid"
            :disabled="waiting"
            debounce="1000"
            required>
          </b-form-input>
          <b-form-invalid-feedback :state="nameIsValid">
            {{invalidMsg}}
          </b-form-invalid-feedback>
        </div>
        <div class="form-option-container">
          <label for="edit-pokemon-nickname-input">Nickname:</label>
          <b-input
            id="edit-pokemon-nickname-input"
            v-model="form.nickname"
            :disabled="waiting"
            required>
          </b-input>
        </div>
        <div class="form-option-container">
          <label for="edit-pokemon-lvl-input">Level:</label>
          <b-input
            id="edit-pokemon-lvl-input"
            v-model="form.lvl"
            :disabled="waiting"
            min="1"
            max="100"
            required
            type="number">
          </b-input>
        </div>
        <div class="form-option-container">
          <label for="edit-pokemon-location-input">Location:</label>
          <b-form-select
            id="edit-pokemon-location-input"
            v-model="form.location"
            :disabled="waiting"
            :options="locationsList"
            selected="Please select a value"
            required>
          </b-form-select>
        </div>
        <div class="form-option-container">
          <b-form-group label="Party Slot:">
            <b-form-radio-group
              v-model="form.party"
              :disabled="waiting"
              :options="partySlots"
              required
              buttons
              button-variant="outline-primary">
            </b-form-radio-group>
          </b-form-group>
        </div>
      </b-input-group>
    </b-form>
  </b-modal>
</template>
<script>
import PokeCard from '@/components/PokeCard.vue';
//import { auth, firestore } from 'firebase';
const Pokedex = require('pokeapi-js-wrapper');

export default {
  name: 'PokeEditor',
  components: {
    PokeCard
  },
  beforeUnMount() {
    this.unsetPokemonInEdit();
  },
  props:  {
    version: String,
    runId: String,
    pokedata: Object,
    pokeId: String
  },
  data: function() {
    return {
      waiting: true,
      searching: false,
      isValidPokemon: null,
      invalidMsg: '',
      pokename: '',
      form: {
        img_url: null,
        real_name: '',
        nickname: '',
        pokemon_id: null,
        lvl: 1,
        location: '',
        types: null,
        stats: null,
        party: -1,
        caught: Date.now(),
        valid: false,
        loading: true
      },
      pokemonInfo: null,
      locationsList: [],
      partySlots: [
        { text: 'Box', value: -1 },
        { text: 'First', value: 0 },
        { text: 'Second', value: 1 },
        { text: 'Third', value: 2 },
        { text: 'Fourth', value: 3 },
        { text: 'Fifth', value: 4 },
        { text: 'Sixth', value: 5 }
      ]
    }
  },
  computed: {
    nameIsValid() {
      if (this.isValidPokemon === null || this.searching) {
        return null;
      }
			
      return this.isValidPokemon;
    }
  },
  watch: {
    pokename: function(newName) {
      this.form.real_name = newName;

      if (!this.form.real_name) {
        this.isValidPokemon = null;
        this.searching = false;
        this.form.valid = false;
        this.form.loading = true;
        return;
      }

      const p = new Pokedex.Pokedex();
      this.searching = true;
      p.getPokemonByName(this.form.real_name.toLowerCase()).then((result) => {
        if(!this.isFoundInGame(result.game_indices)) {
          this.setInvalidForm('The desired pokemon does not appear in this game');
          return;
        }
        this.form.loading = false;
        this.isValidPokemon = true;
        this.searching = false;
        this.form.valid = true;
        this.form.img_url = result.sprites.front_default;
        this.form.pokemon_id = result.id;
        this.form.stats = result.stats.map(s => {
          return {
            name: s.stat.name,
            val: s.base_stat
          };
        });
        this.form.types = result.types.map(t => {
          return t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
        });
        this.invalidMsg = '';
        console.log(result);
      }).catch(() => {
        this.setInvalidForm('Pokemon not found');
      });
    }
  },
  methods: {
    resetForm() {
      if (!this.pokedata || !this.pokeId) {
        return;
      }

      this.searching = false;
      this.isValidPokemon = null;
      this.pokename = '';
      this.invalidMsg = '';
      this.form = {
        img_url: null,
        real_name: this.pokedata.real_name,
        nickname: this.pokedata.nickname,
        pokemon_id: this.pokedata.pokemon_id,
        lvl: this.pokedata.lvl,
        location: this.pokedata.location,
        types: this.pokedata.types,
        stats: this.pokedata.stats,
        party: this.pokedata.party,
        caught: this.pokedata.caught,
        valid: false,
        loading: true
      };
      this.pokemonInfo = null;

      const p = new Pokedex.Pokedex();
      console.log(this.version);
      p.getVersionByName(this.version).then((result) => {
        p.resource(result.version_group.url).then((res) => {
          if(res.regions[0]){
            p.resource(res.regions[0].url).then((region) => {
              const sortedList = region.locations.map(l => l.name).sort();
              const list = sortedList.map(l => {
                return { text: this.getLocationTxt(l), value: l };
              });
              this.locationsList = list;
              this.waiting = false;
            });
          }
        });
      }).catch(() => {
        this.waiting = false;
      });
			
    },
    getLocationTxt(location){
      const dashSplit = location.split('-');
      let str = '';
      dashSplit.forEach(split => {
        str += (split.charAt(0).toUpperCase() + split.slice(1)) + ' ';
      });

      return str;
    },
    constructData(){
      return {
        real_name: this.form.real_name,
        nickname: this.form.nickname,
        pokemon_id: this.form.pokemon_id,
        img_url: this.form.img_url,
        lvl: this.form.lvl,
        types: this.form.types,
        location: this.form.location,
        stats: this.form.stats,
        death: null,
        caught: this.form.caught
      }
    },
    handleOk() {
      /*const runQuery = `users/${auth().currentUser.uid}/runs/${this.runId}`;
      const pokemonQuery = `${runQuery}/pokemon`;
      firestore().collection(pokemonQuery).edit(this.constructData()).then(() => {
        const partyVal = this.partySlots.find(s => s.value === this.form.party);

        if(partyVal && partyVal.value !== -1) {
          let partyObj = new Object();
          partyObj[`party.${partyVal.text.toLowerCase()}`] = this.constructData();
          firestore().doc(runQuery).update(partyObj);
        }
      });*/
      this.unsetPokemonInEdit();
    },
    unsetPokemonInEdit() {
      console.log('Cancelling..');
      this.$store('set_pokemonInEdit', '');
    },
    setInvalidForm(msg){
      this.invalidMsg = msg;
      this.searching = false;
      this.isValidPokemon = false;
      this.form.valid = false;
      this.form.img_url = null;
      this.pokemonInfo = null;
      this.form.loading = true;
    },
    isFoundInGame(allGames) {
      for(let i = 0; i < allGames.length; i++) {
        if (allGames[i].version.name === this.version) {
          return true;
        }
      }

      return false;
    }
  }
}
</script>
<style scoped>
#example-pokecard {
	max-width: 380px;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 15px;
}
.form-option-container {
	margin: 5px 0px;
	width: 100%;
}
.form-img-container {
	margin-top: 15px;
	margin-left: auto;
	margin-right: auto;
}
</style>