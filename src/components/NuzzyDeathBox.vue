<template>
  <div>
    <div 
      v-for="d in data"
      :key="d.id">
      <PokeCard
        :run="run"
        :runId="runId"
        :pokedata="d">
      </PokeCard>
    </div>
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