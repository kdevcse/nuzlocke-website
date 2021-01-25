<template>
  <div>
    <b-button-toolbar class="pokecard-toolbar">
      <b-button-group size="sm">
        <b-button
          variant="success"
          title="Add level"
          @click="onPokeLevelUp"
          :disabled="!canPress">
          <b-icon icon="plus"></b-icon>
        </b-button>
        <b-button
          variant="warning"
          title="Evolve"
          :disabled="!canPress">
          <b-icon icon="chevron-double-up"></b-icon>
        </b-button>
        <b-button
          v-if="canMoveToBox"
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
          <b-icon icon="emoji-dizzy"></b-icon>
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

export default {
  name: 'PokeCardToolbar',
  props: {
    pokedata: Object,
    demo: Boolean,
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
      const runQuery = `users/${auth().currentUser.uid}/runs/${this.runId}`;
      const pokemonQuery = `${runQuery}/pokemon`;
      const pokemon = new Pokemon();
      pokemon.setValuesFromPokeDataObj(this.pokedata);
      pokemon.lvl += 1;

      firestore().collection(pokemonQuery).doc(pokemon.id).update(pokemon.object);
    },
    onPokeMoveToBox() {
      const runQuery = `users/${auth().currentUser.uid}/runs/${this.runId}`;
      const pokemonQuery = `${runQuery}/pokemon`;
      const pokemon = new Pokemon();
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
      const runQuery = `users/${auth().currentUser.uid}/runs/${this.runId}`;
      const pokemonQuery = `${runQuery}/pokemon`;
      const pokemon = new Pokemon();
      pokemon.setValuesFromPokeDataObj(this.pokedata);
      pokemon.death = Date.now();

      firestore().collection(pokemonQuery).doc(pokemon.id).update(pokemon.object);
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