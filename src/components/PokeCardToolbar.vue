<template>
  <div>
    <b-button-toolbar class="pokecard-toolbar">
      <b-button-group size="sm">
        <b-button
          variant="success"
          title="Add level"
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
import { getPartyText } from '@/helpers/partyHelper.js';

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
    }
  },
  methods: {
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

      firestore().collection(pokemonQuery).doc(pokemon.id).update(pokemon.object).then(() => {
        var txt = getPartyText(pokemon.party);
        console.log(txt);
        if (txt) {
          let partyObj = new Object();
          partyObj[`party.${txt}`] = pokemon.object;
          partyObj[`party.${txt}`].id = pokemon.id;
          firestore().doc(runQuery).update(partyObj);
        }
      }).catch((error) => {
        console.error(error)
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