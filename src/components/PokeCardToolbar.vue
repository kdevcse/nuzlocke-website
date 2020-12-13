<template>
  <div>
    <b-button-toolbar class="pokecard-toolbar">
      <b-button-group size="sm">
        <b-button
          variant="success"
          title="Add level">
          <b-icon icon="plus"></b-icon>
        </b-button>
        <b-button
          variant="warning"
          title="Evolve">
          <b-icon icon="chevron-double-up"></b-icon>
        </b-button>
        <b-button
          variant="danger"
          title="Death">
          <b-icon icon="emoji-dizzy-fill"></b-icon>
        </b-button>
        <b-button 
          title="Edit"
          v-b-modal.add-poke-window>
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
    pokedata: Object
  }
}
</script>

<style>
.pokecard-toolbar {
  display: flex;
  justify-content: flex-end;
}
</style>