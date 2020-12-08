<template>
	<div id="party-container">
		<div class="run-party-title-bar">
			<h3>Party</h3>
		</div>
		<div id="all-pokes-container">
			<div class="poke-container">
				<PokeCard v-if='party.first' :pokedata='party.first'></PokeCard>
				<div v-else class='empty-slot'>
					<h4>Empty</h4>
				</div>
			</div>
			<div class="poke-container">
				<PokeCard v-if='party.second' :pokedata='party.second'></PokeCard>
				<div v-else class='empty-slot'>
					<h4>Empty</h4>
				</div>
			</div>
			<div class="poke-container">
				<PokeCard v-if='party.third' :pokedata='party.third'></PokeCard>
				<div v-else class='empty-slot'>
					<h4>Empty</h4>
				</div>
			</div>
			<div class="poke-container">
				<PokeCard v-if='party.fourth' :pokedata='party.fourth'></PokeCard>
				<div v-else class='empty-slot'>
					<h4>Empty</h4>
				</div>
			</div>
			<div class="poke-container">
				<PokeCard v-if='party.fifth' :pokedata='party.fifth'></PokeCard>
				<div v-else class='empty-slot'>
					<h4>Empty</h4>
				</div>
			</div>
			<div class="poke-container">
				<PokeCard v-if='party.sixth' :pokedata='party.sixth'></PokeCard>
				<div v-else class='empty-slot'>
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
		party: Object
	},
	methods: {
		getCardTitle(p) {
			const titleDataExists = p.real_name && p.lvl;
			return titleDataExists ? `${p.real_name} - Lvl.${p.lvl}` : 'Loading...';
		},
		getPokeTypes(types) {
			if(!types || types.length === 0)
				return;

			let msg = types[0];
			if(types.length > 1){
				for(let i = 1; i < types.length; i++) {
					msg += `/${types[i]}`
				}
			}

			return msg;
		},
		getPartyCardId(id) {
			return `party-card-${id}`;
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
	margin-bottom: 15px;
	border-bottom: black 1px solid;
	margin-bottom: 15px;
	padding-bottom: 15px;
}
</style>