<template>
  <b-modal
    centered
    size="lg"
    id="add-poke-window"
    title="Add a Pokemon"
    :ok-disabled="!validForm"
    ok-title="Add"
    ok-variant="success"
    @ok="handleOk"
    @show="resetForm">
    <PokeCard
      id="example-pokecard"
      :pokedata="pokemon"
      :loading="loading"
      demo>
    </PokeCard>
    <b-form
      ref="form"
      class="form-container">
      <b-input-group>
        <div class="form-option-container">
          <label for="add-pokemon-name-input">Pokemon Name:</label>
          <b-form-input
            id="add-pokemon-name-input"
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
          <label for="add-pokemon-nickname-input">Nickname:</label>
          <b-input
            id="add-pokemon-nickname-input"
            v-model="pokemon.nickname"
            :disabled="waiting"
            required>
          </b-input>
        </div>
        <div class="form-option-container">
          <label for="add-pokemon-lvl-input">Level:</label>
          <b-input
            id="add-pokemon-lvl-input"
            v-model="pokemon.lvl"
            :disabled="waiting"
            min="1"
            max="100"
            required
            type="number">
          </b-input>
        </div>
        <div class="form-option-container">
          <label for="add-pokemon-location-input">Location:</label>
          <b-form-select
            id="add-pokemon-location-input"
            v-model="pokemon.location"
            :disabled="waiting"
            :options="locationsList"
            selected="Please select a value"
            required>
          </b-form-select>
        </div>
        <div class="form-option-container">
          <b-form-group label="Party Slot:">
            <b-form-radio-group
              v-model="pokemon.party"
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
import { auth, firestore } from 'firebase';
import Pokemon from '@/models/pokemon.js';
const Pokedex = require('pokeapi-js-wrapper');

export default {
  name: 'PokeAdder',
  components: {
    PokeCard
  },
  props:  {
    version: String,
    runId: String
  },
  data: function() {
    return {
      validForm: false,
      loading: true,
      waiting: true,
      searchingEvolutions: false,
      searchingForName: false,
      isValidPokemon: null,
      invalidMsg: '',
      pokename: '',
      pokemon: new Pokemon(),
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
    },
    searching() {
      return this.searchingEvolutions && this.searchingForName;
    }
  },
  watch: {
    pokename: function(newName) {
      this.pokemon.real_name = newName;

      if (!this.pokemon.real_name) {
        this.isValidPokemon = null;
        this.searchingEvolutions = false,
        this.searchingForName = false,
        this.validForm = false;
        this.loading = true;
        return;
      }

      const p = new Pokedex.Pokedex();
      this.searchingEvolutions = true,
      this.searchingForName = true,
      p.getPokemonByName(this.pokemon.real_name.toLowerCase()).then((result) => {
        if(!this.isFoundInGame(result.game_indices)) {
          this.setInvalidForm('The desired pokemon does not appear in this game');
          return;
        }
        this.loading = false;
        this.isValidPokemon = true;
        this.validForm = true;
        this.pokemon.img_url = result.sprites.front_default;
        this.pokemon.pokemon_id = result.id;
        this.pokemon.stats = result.stats.map(s => {
          return {
            name: s.stat.name,
            val: s.base_stat
          };
        });
        this.pokemon.types = result.types.map(t => {
          return t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
        });
        return this.getEvolutions(result.species.url, this.pokemon.real_name.toLowerCase());
      }).then(() => {
        this.invalidMsg = '';
      }).catch(() => {
        this.setInvalidForm('Pokemon not found');
      }).finally(() => {
        this.searchingForName = false;
      });
    }
  },
  methods: {
    constructData() {
      this.pokemon.real_name = this.pokemon.real_name.toLowerCase();
      return this.pokemon.object;
    },
    resetForm() {
      this.isValidPokemon = null;
      this.pokename = '';
      this.invalidMsg = '';
      this.pokemon = new Pokemon();

      const p = new Pokedex.Pokedex();
      p.getVersionByName(this.version).then((result) => {
        return p.resource(result.version_group.url);
      }).then((res) => {
        if (res.regions[0]) {
          return p.resource(res.regions[0].url);
        }
      }).then((region) => {
        const sortedList = region.locations.map(l => l.name).sort();
        const list = sortedList.map(l => {
          return { text: this.getLocationTxt(l), value: l };
        });
        this.locationsList = list;
      }).finally(() => {
        this.waiting = false;
      });
			
    },
    getLocationTxt(location) {
      const dashSplit = location.split('-');
      let str = '';
      dashSplit.forEach(split => {
        str += (split.charAt(0).toUpperCase() + split.slice(1)) + ' ';
      });

      return str;
    },
    handleOk() {
      const runQuery = `users/${auth().currentUser.uid}/runs/${this.runId}`;
      const pokemonQuery = `${runQuery}/pokemon`;
      firestore().collection(pokemonQuery).add(this.constructData()).then((doc) => {
        const partyVal = this.partySlots.find(s => s.value === this.pokemon.party);

        if(partyVal && partyVal.value !== -1) {
          let partyObj = new Object();
          partyObj[`party.${partyVal.text.toLowerCase()}`] = this.constructData();
          partyObj[`party.${partyVal.text.toLowerCase()}`].id = doc.id;
          firestore().doc(runQuery).update(partyObj);
        }
      });
    },
    setInvalidForm(msg) {
      this.invalidMsg = msg;
      this.isValidPokemon = false;
      this.validForm = false;
      this.pokemon.img_url = null;
      this.pokemon.loading = true;
    },
    isFoundInGame(allGames) {
      for(let i = 0; i < allGames.length; i++) {
        if (allGames[i].version.name === this.version) {
          return true;
        }
      }

      return false;
    },
    async getEvolutions(speciesUrl, pokename) {
      if (!speciesUrl) {
        this.searchingEvolutions = false;
        return Promise.resolve();
      }

      const p = new Pokedex.Pokedex();
      return await p.resource(speciesUrl).then((speciesResult) => {
        if (!speciesResult.evolution_chain){
          return;
        }

        return p.resource(speciesResult.evolution_chain.url);
      }).then((evolutionResult) => {
        let chain = evolutionResult.chain.evolves_to;
        let startCapturingEvos = false;
        let evos = [];

        while (chain && chain.length > 0) {
          let poke = chain[0];

          if (poke.species.name === pokename) {
            startCapturingEvos = true;
          }
          
          if (startCapturingEvos && poke.species.name != pokename) {
            evos.push(poke.species.name);
          }

          chain = poke.evolves_to;
        }

        this.pokemon.evolutions = evos;
      }).finally(() => {
        this.searchingEvolutions = false;
      });
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