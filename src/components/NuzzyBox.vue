<template>
  <div id="box-container">
    <div class="run-box-title-bar">
      <h3>Pokemon Box</h3>
    </div>
    <div id="box">
      <PokeCard
        class="pokebox-card"
        v-for="(pokemon, index) in data"
        :key="pokemon.id"
        :pokedata="pokemon"
        :index="index"
        :runId="runId">
      </PokeCard>
    </div>
  </div>
</template>
<script>
import PokeCard from '@/components/PokeCard.vue';

export default {
  name: 'NuzzyBox',
  components: {
    PokeCard
  },
  props: {
    data: Array,
    runId: String
  }
}
</script>
<style scoped>
#box {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-column-gap: 15px;
	grid-row-gap: 15px;
	padding: 30px 0px;
}
.run-box-title-bar {
	display: flex;
	flex-direction: row;
	width: 100%;
	text-align: left;
	border-bottom: black 1px solid;
}
.party-toolbar{
	margin: 0 10px;
}
</style>