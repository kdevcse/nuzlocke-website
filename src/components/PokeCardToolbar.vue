<template>
  <div>
    <b-button-toolbar class="pokecard-toolbar">
      <b-button-group size="sm">
        <b-button
          v-if="!pokedata.death"
          variant="success"
          title="Add level"
          @click="onPokeLevelUp"
          :disabled="!canPress">
          +1
        </b-button>
        <b-button
          v-if="getEvolvedPokemon && !pokedata.death"
          @click="onPokeEvolve"
          variant="warning"
          title="Evolve"
          :disabled="!canPress">
          <b-icon icon="chevron-double-up"></b-icon>
        </b-button>
        <b-button
          v-if="canMoveToBox && isNotDead"
          @click="onPokeMoveToBox"
          variant="info"
          title="Move to Box"
          :disabled="!canPress">
          <b-icon icon="box"></b-icon>
        </b-button>
        <b-button
          v-if="isNotDead"
          variant="danger"
          title="Death"
          @click="onPokeDeath"
          :disabled="!canPress">
          <font-awesome-icon :icon="['fas', 'skull-crossbones']"></font-awesome-icon>
        </b-button>
        <b-button
          v-if="!isNotDead"
          variant="info"
          title="Revive"
          @click="onPokeRevive"
          :disabled="!canPress">
          <font-awesome-icon :icon="['fas', 'heartbeat']"></font-awesome-icon>
        </b-button>
        <b-button 
          title="Edit"
          @click="onPokeEdit"
          :disabled="!canPress">
          <b-icon icon="pencil-square"></b-icon>
        </b-button>
      </b-button-group>
    </b-button-toolbar>
  </div>
</template>

<script>
import { auth, firestore } from 'firebase';
import Pokemon from '@/models/pokemon.js';
const Pokedex = require('pokeapi-js-wrapper');

export default {
  name: 'PokeCardToolbar',
  props: {
    pokedata: Object,
    demo: Boolean,
    run: Object,
    runId: String
  },
  computed: {
    canPress() {
      return !this.demo && this.pokedata && this.pokedata.id;
    },
    canMoveToBox() {
      return this.pokedata ? this.pokedata.party > -1 : false;
    },
    isNotDead() {
      return !this.pokedata.death;
    }
  },
  methods: {
    onPokeLevelUp() {
      if (!this.pokedata.id) {
        console.warn('Edit window did not open because there was no associated ID');
        return;
      }

      const runQuery = `users/${auth().currentUser.uid}/runs/${this.runId}`;
      const pokemonQuery = `${runQuery}/pokemon`;
      let pokemon = new Pokemon();
      pokemon.setValuesFromPokeDataObj(this.pokedata);
      pokemon.lvl += 1;

      firestore().collection(pokemonQuery).doc(pokemon.id).update(pokemon.object);
    },
    onPokeMoveToBox() {
      if (!this.pokedata.id) {
        console.warn('Edit window did not open because there was no associated ID');
        return;
      }

      const runQuery = `users/${auth().currentUser.uid}/runs/${this.runId}`;
      const pokemonQuery = `${runQuery}/pokemon`;
      let pokemon = new Pokemon();
      pokemon.setValuesFromPokeDataObj(this.pokedata);
      pokemon.party = -1;

      firestore().collection(pokemonQuery).doc(pokemon.id).update(pokemon.object);
    },
    onPokeEdit() {
      if (!this.pokedata.id) {
        console.warn('Edit window did not open because there was no associated ID');
        return;
      }

      this.$store.commit('set_pokemonInEdit', this.pokedata);
    },
    onPokeDeath() {
      if (!this.pokedata.id) {
        console.warn('Edit window did not open because there was no associated ID');
        return;
      }

      const runQuery = `users/${auth().currentUser.uid}/runs/${this.runId}`;
      const pokemonQuery = `${runQuery}/pokemon`;
      let pokemon = new Pokemon();
      pokemon.setValuesFromPokeDataObj(this.pokedata);
      pokemon.death = Date.now();

      firestore().collection(pokemonQuery).doc(pokemon.id).update(pokemon.object);
    },
    onPokeRevive() {
      if (!this.pokedata.id) {
        console.warn('Edit window did not open because there was no associated ID');
        return;
      }

      const runQuery = `users/${auth().currentUser.uid}/runs/${this.runId}`;
      const pokemonQuery = `${runQuery}/pokemon`;
      let pokemon = new Pokemon();
      pokemon.setValuesFromPokeDataObj(this.pokedata);
      pokemon.death = null;
      pokemon.party = -1;

      firestore().collection(pokemonQuery).doc(pokemon.id).update(pokemon.object);
    },
    getEvolvedPokemon() {
      const p = new Pokedex.Pokedex();
      return p.getPokemonSpeciesByName(this.pokedata.real_name).then((speciesResult) => {
        return p.resource(speciesResult.evolution_chain.url);
      }).then((result) => {
        let chain = result.chain;
        let nextPokeIsEvo = false;
        const maxDepthSearch = 5;
        let searchIteration = 0;

        while (chain && searchIteration < maxDepthSearch) {
          if (chain.species.name === this.pokedata.real_name) {
            nextPokeIsEvo = true;
          }
          
          if (nextPokeIsEvo && chain.species.name !== this.pokedata.real_name) {
            return chain.species.name;
          }

          chain = chain.evolves_to[0];
          searchIteration++;
        }

        return null;
      }).then((evolvedPokeName) => {
        return evolvedPokeName ? p.getPokemonByName(evolvedPokeName): null;
      }).then((result) => {
        if (!result) {
          this.$bvToast.toast('This pokemon cannot evolve or is at the final evolution stage',{
            title: 'Cannot evolve pokemon',
            toaster: 'b-toaster-top-right',
            variant: 'danger',
            solid: true,
            appendToast: true
          });
          return;
        }

        let evolvedPokemon = new Pokemon();
        evolvedPokemon.setValuesFromApiResultSet(
          result.name,
          result.sprites,
          this.run.generation,
          this.run.version,
          result.id,
          result.stats,
          result.types
        );
        return evolvedPokemon.object;
      }).catch((error) => {
        console.error(error);
      });
    },
    onPokeEvolve() {
      if (!this.pokedata.id) {
        console.warn('Edit window did not open because there was no associated ID');
        return;
      }

      this.getEvolvedPokemon().then((evolvedPokemon) => {
        if (!evolvedPokemon) {
          return;
        }

        const runQuery = `users/${auth().currentUser.uid}/runs/${this.runId}`;
        const pokemonQuery = `${runQuery}/pokemon`;
        let pokemon = new Pokemon();
        pokemon.setValuesFromPokeDataObj(this.pokedata);
        pokemon.real_name = evolvedPokemon.real_name;
        pokemon.pokemon_id = evolvedPokemon.pokemon_id;
        pokemon.img_url = evolvedPokemon.img_url;

        firestore().collection(pokemonQuery).doc(pokemon.id).update(pokemon.object);
      }).catch((error) => {
        console.error(error);
      });
    }
  }
}
</script>

<style>
.pokecard-toolbar {
  display: flex;
  justify-content: flex-end;
}
</style>