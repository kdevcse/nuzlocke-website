<template>
  <b-modal
    centered
    size="lg"
    id="edit-poke-window"
    title="Edit a Pokemon"
    :ok-disabled="!validForm"
    ok-title="Edit"
    ok-variant="success"
    cancel-title="Delete"
    cancel-variant="danger"
    @ok="handleOk"
    @show="resetForm"
    @close="handleClose"
    @cancel="handleDelete">
    <PokeCard
      id="example-pokecard"
      :pokedata="pokemon"
      demo>
    </PokeCard>
    <b-form
      ref="form"
      class="form-container">
      <b-input-group>
        <div class="form-option-container">
          <label for="edit-pokemon-name-input">Pokemon Name:</label>
          <b-form-select
            id="edit-pokemon-name-input"
            v-model="pokemon.real_name"
            :options="pokemonNamesList"
            :disabled="true"
            required>
          </b-form-select>
        </div>
        <div class="form-option-container">
          <label for="edit-pokemon-nickname-input">Nickname:</label>
          <b-input
            id="edit-pokemon-nickname-input"
            v-model="pokemon.nickname"
            :disabled="waiting"
            required>
          </b-input>
        </div>
        <div class="form-option-container">
          <label for="edit-pokemon-lvl-input">Level:</label>
          <b-input
            id="edit-pokemon-lvl-input"
            v-model="pokemon.lvl"
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
  name: 'PokeEditor',
  components: {
    PokeCard
  },
  props:  {
    version: String,
    runId: String,
    pokedata: Object
  },
  data: function() {
    return {
      validForm: false,
      waiting: true,
      invalidMsg: '',
      pokemon: new Pokemon(),
      locationsList: [],
      pokemonNamesList:[],
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
  watch : {
    pokedata() {
      const windowName = 'edit-poke-window';

      if (this.pokedata !== null) {
        this.$bvModal.show(windowName);
      } else {
        this.$bvModal.hide(windowName);
      }
    }
  },
  methods: {
    resetForm() {
      this.pokemon = new Pokemon();
      if (!this.pokedata) {
        this.validForm = false;
        return;
      }

      this.invalidMsg = '';
      this.pokemon.setValuesFromPokeDataObj(this.pokedata);
      this.pokemonNamesList = this.getPokedexNamesList(this.pokemon.real_name);
      this.waiting = true;

      const p = new Pokedex.Pokedex();
      p.getVersionByName(this.version).then((result) => {
        return p.resource(result.version_group.url);
      }).then((res) => {
        if (res.regions[0]) {
          return p.resource(res.regions[0].url);
        }
      }).then((data) => {
        this.locationsList = this.getLocationsList(data.locations);
        this.validForm = true;
      }).catch((error) => {
        console.error(error);
        this.validForm = false;
      }).finally(() => {
        this.waiting = false;
      });
    },
    getPokedexNamesList(name){
      return [{ 
        text: name.charAt(0).toUpperCase() + name.slice(1),
        value: name
      }]
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

      return str.trimEnd();
    },
    handleOk() {
      const runQuery = `users/${auth().currentUser.uid}/runs/${this.runId}`;
      const pokemonQuery = `${runQuery}/pokemon`;
      console.log(this.pokemon.object);
      firestore().collection(pokemonQuery).doc(this.pokemon.id).update(this.pokemon.object).catch((error) => {
        console.error(error);
      }).finally(() => {
        this.handleClose();
      });
    },
    handleDelete() {
      const runQuery = `users/${auth().currentUser.uid}/runs/${this.runId}`;
      const pokemonQuery = `${runQuery}/pokemon`;
      firestore().collection(pokemonQuery).doc(this.pokemon.id).delete().finally(() => {
        this.handleClose();
      });
    },
    handleClose() {
      this.$store.commit('set_pokemonInEdit', null);
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