<template>
  <div>
    <b-button-toolbar class="pokecard-toolbar">
      <b-button-group size="sm">
        <b-button
          variant="success"
          title="Add level"
          :disabled="demo">
          <b-icon icon="plus"></b-icon>
        </b-button>
        <b-button
          variant="warning"
          title="Evolve"
          :disabled="demo">
          <b-icon icon="chevron-double-up"></b-icon>
        </b-button>
        <b-button
          variant="danger"
          title="Death"
          :disabled="demo">
          <b-icon icon="emoji-dizzy-fill"></b-icon>
        </b-button>
        <b-button 
          title="Edit"
          @click="onPokeEdit"
          :disabled="demo">
          <b-icon icon="pencil-square"></b-icon>
        </b-button>
      </b-button-group>
    </b-button-toolbar>
  </div>
</template>

<script>
export default {
  name: 'PokeCardToolbar',
  props: {
    pokedata: Object,
    demo: Boolean
  },
  methods: {
    onPokeEdit() {
      if (!this.pokedata.id) {
        console.warn('Edit window did not open because there was no associated ID');
        return;
      }

      this.$store.commit('set_pokemonInEdit', this.pokedata);
      this.$bvModal.show('edit-poke-window');
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