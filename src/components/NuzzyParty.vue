<template>
  <div id="party-container">
    <div id="all-pokes-container">
      <div 
        v-for="n in 6"
        :key="n"
        class="poke-party-container">
        <PokeCard
          v-if="getPartyInfo(n -1)"
          :pokedata="getPartyInfo(n - 1)"
          :runId="runId"></PokeCard>
        <div
          v-else
          class="empty-slot">
          <h4>Empty</h4>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PokeCard from '@/components/PokeCard.vue';

export default {
  name: 'NuzzyParty',
  components: {
    PokeCard
  },
  props: {
    party: Array,
    runId: String
  },
  methods: {
    getPartyInfo(partyNum) {
      for (let i = 0; i < this.party.length; i++) {
        if (this.party[i] && this.party[i].party === partyNum) {
          return this.party[i];
        }
      }

      return null;
    }
  }
}
</script>
<style scoped>
#all-pokes-container {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	grid-column-gap: 15px;
	grid-row-gap: 15px;
	padding: 30px 0px;
}
.empty-slot{
	display: flex;
	flex-direction: column;
	height: 100%;
	border: dotted black 2px;
	border-radius: 6px;
	justify-content: center;
}
.run-party-title-bar {
	display: flex;
	flex-direction: row;
	width: 100%;
	text-align: left;
	border-bottom: black 1px solid;
}
</style>