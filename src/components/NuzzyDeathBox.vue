<template>
  <div>
    <div 
      v-if="data.length > 0"
      class="deathbox-container">
      <div
        class="deathcard-container"
        v-for="d in data"
        :key="d.id">
        <PokeCard
          :run="run"
          :runId="runId"
          :pokedata="d">
        </PokeCard>
      </div>
    </div>
    <p v-else>
      No pokemon deaths have occurred
    </p>
  </div>
</template>
<script>
import PokeCard from '@/components/PokeCard.vue';

export default {
  name: 'NuzzyDeathBox',
  components: {
    PokeCard
  },
  props: {
    data: Array,
    run: Object,
    runId: String
  }
}
</script>
<style scoped>
.deathcard-container {
  margin: 15px 0px;
}
</style>