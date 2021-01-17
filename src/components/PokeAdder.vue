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
          <b-form-select
            id="add-pokemon-name-input"
            v-model="selectedPokemon"
            :disabled="waiting"
            :options="pokemonNamesList"
            selected="Please select a value"
            required>
          </b-form-select>
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
      invalidMsg: '',
      selectedPokemon: null,
      pokemon: new Pokemon(),
      locationsList: [],
      pokemonNamesList: [],
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
  watch: {
    selectedPokemon: function(selected) {
      if (!selected) {
        this.validForm = false;
        return;
      }

      const p = new Pokedex.Pokedex();
      this.searchingEvolutions = true;
      this.loading = true;
      p.getPokemonByName(selected.name).then((result) => {
        this.loading = false;
        this.validForm = true;
        this.pokemon.setValuesFromApiResultSet(
          result.name,
          result.sprites.front_default,
          result.id,
          result.stats,
          result.types
        );
        return this.getEvolutions(result.species.url, this.pokemon.real_name.toLowerCase());
      }).then(() => {
        this.invalidMsg = '';
      }).catch(() => {
        this.setInvalidForm('Pokemon not found');
      });
    }
  },
  methods: {
    resetForm() {
      this.invalidMsg = '';
      this.pokemon = new Pokemon();
      this.waiting = true;

      const p = new Pokedex.Pokedex();
      p.getVersionByName(this.version).then((result) => {
        return p.resource(result.version_group.url);
      }).then(async (res) => {
        if (res.regions[0]) {
          const region = await p.resource(res.regions[0].url);
          const pokedex = await p.resource(res.pokedexes[0].url);
          return { region: region, pokedex: pokedex.pokemon_entries };
        }
      }).then((data) => {
        this.locationsList = this.getLocationsList(data.region.locations);
        this.pokemonNamesList = this.getPokedexNamesList(data.pokedex);
        this.selectedPokemon = this.pokemonNamesList[0].value;
      }).catch((error) => {
        console.error(error);
        this.validForm = false;
      }).finally(() => {
        this.waiting = false;
      });
    },
    getPokedexNamesList(pokedex){
      return pokedex.map(p => { 
        var name = p.pokemon_species.name;
        return { 
          text: name.charAt(0).toUpperCase() + name.slice(1),
          value: p.pokemon_species
        }
      });
    },
    getLocationsList(locations) {
      const sortedLocationsList = locations.map(l => l.name).sort();
      return sortedLocationsList.map(l => {
        return { text: this.getLocationTxt(l), value: l };
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
      firestore().collection(pokemonQuery).add(this.pokemon.object).then((doc) => {
        const partyVal = this.partySlots.find(s => s.value === this.pokemon.party);

        if (partyVal && partyVal.value !== -1) {
          let partyObj = new Object();
          partyObj[`party.${partyVal.text.toLowerCase()}`] = this.pokemon.object;
          partyObj[`party.${partyVal.text.toLowerCase()}`].id = doc.id;
          firestore().doc(runQuery).update(partyObj);
        }
      });
    },
    setInvalidForm(msg) {
      this.invalidMsg = msg;
      this.validForm = false;
    },
    async getEvolutions(speciesUrl, pokename) {
      if (!speciesUrl) {
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