<template>
  <div id="party-container">
    <div 
      v-if="party.length > 0"
      id="all-pokes-container">
      <div 
        v-for="n in 6"
        :key="n"
        class="poke-party-container">
        <PokeCard
          v-if="getPartyInfo(n -1)"
          :pokedata="getPartyInfo(n - 1)"
          :run="run"
          :runId="runId"></PokeCard>
        <div
          v-else
          class="empty-slot">
          <h4>Empty</h4>
        </div>
      </div>
    </div>
    <p v-else>
      No pokemon are present in the party. Click the "Add Pokemon" button to get started!
    </p>
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
    run: Object,
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
  min-height: 278px;
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