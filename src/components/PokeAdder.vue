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
        <div class="radio-group-containers">
          <div class="form-option-container">
            <b-form-group label="Gender:">
              <b-form-radio-group
                v-model="pokemon.gender"
                :disabled="waiting"
                :options="genderOptions"
                required
                buttons
                button-variant="outline-primary">
              </b-form-radio-group>
            </b-form-group>
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
        </div>
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
      </b-input-group>
    </b-form>
  </b-modal>
</template>
<script>
import PokeCard from '@/components/PokeCard.vue';
import { auth, firestore } from 'firebase';
import Pokemon from '@/models/pokemon.js';
import PokeStatusEvent from '@/models/events/pokeStatusEvent.js';
import { EventTypes } from '@/models/events/event.js'
const Pokedex = require('pokeapi-js-wrapper');

export default {
  name: 'PokeAdder',
  components: {
    PokeCard
  },
  props:  {
    run: Object,
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
      genderOptions: [
        { text: 'None', value: -1 },
        { text: 'M', value: 0 },
        { text: 'F', value: 1 }
      ],
      partySlots: [
        { text: 'Box', value: -1 },
        { text: '1', value: 0 },
        { text: '2', value: 1 },
        { text: '3', value: 2 },
        { text: '4', value: 3 },
        { text: '5', value: 4 },
        { text: '6', value: 5 }
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
          result.sprites,
          this.run.generation,
          this.run.version,
          result.id,
          result.stats,
          result.types
        );
        this.invalidMsg = '';
      }).catch((error) => {
        console.error(error);
        this.setInvalidForm('Pokemon not found');
      });
    }
  },
  methods: {
    resetForm() {
      this.invalidMsg = '';
      this.pokemon = new Pokemon();
      const p = new Pokedex.Pokedex();
      this.selectedPokemon = null;
      this.pokemonNamesList = [];
      this.locationsList = [];
      this.waiting = true;
      var promises = [];

      this.run.pokedexes.forEach((pdx) => {
        promises.push(p.getPokedexByName(pdx).then((pdxResult) => {
          this.addToPokedexNamesList(pdxResult);
        }));
      });
      this.run.regions.forEach((region) => {
        promises.push(p.getRegionByName(region).then((regResult) => {
          this.addToLocationsList(regResult.locations);
        }));
      });

      Promise.all(promises).then(() => {
        this.locationsList = this.locationsList.sort();
        this.selectedPokemon = this.pokemonNamesList[0].value;
      }).catch ((e) => {
        console.error(e);
        this.validForm = false;
      }).finally(() => {
        this.waiting = false;
      });
    },
    addToPokedexNamesList(pokedex) {
      pokedex.pokemon_entries.forEach(p => { 
        var name = p.pokemon_species.name;
        this.pokemonNamesList.push({ 
          text: name.charAt(0).toUpperCase() + name.slice(1),
          value: p.pokemon_species
        });
      });
    },
    addToLocationsList(locations) {
      locations.forEach(l => {
        this.locationsList.push({ 
          text: this.getLocationTxt(l.name), 
          value: l.name 
        });
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
      const eventQuery = `${runQuery}/events`;

      firestore().collection(pokemonQuery).add(this.pokemon.object).then((addedPoke) => {
        return addedPoke.id;
      }).then((pokeId) => {
        return firestore()
          .collection(pokemonQuery).where('party', '==', this.pokemon.party)
          .get().then((querySnapshot) => {
            var docsToRemove = [];
            querySnapshot.forEach((doc => {
              if (doc.id !== pokeId) {
                docsToRemove.push(doc);
              }
            }));
            return docsToRemove;
          });
      }).then((pokesToRemoveFromParty) => {
        if (pokesToRemoveFromParty.length === 0) {
          return;
        }

        pokesToRemoveFromParty.forEach((poke) => {
          let pokeData = poke.data();
          pokeData.party = -1;
          firestore().collection(pokemonQuery).doc(poke.id).update(pokeData);
        });
      }).then(() => {
        var eventData = new PokeStatusEvent(this.pokemon.object, EventTypes.CAPTURED);
        return firestore().collection(eventQuery).add(eventData.object)
      }).catch((error) => {
        console.log(error);
      });
    },
    setInvalidForm(msg) {
      this.invalidMsg = msg;
      this.validForm = false;
    }
  }
}
</script>
<style scoped>
.radio-group-containers {
  display: flex;
}
.radio-group-containers > div {
  flex: 1;
  margin-right: 20px;
}
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