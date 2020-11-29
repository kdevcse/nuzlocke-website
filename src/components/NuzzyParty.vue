<template>
	<div id="party-container">
		<div class="run-party-title-bar">
			<h3>Party</h3>
			<b-button-toolbar class="party-toolbar">
				<b-button-group size="sm">
					<b-button>+</b-button>
					<b-button>Edit</b-button>
				</b-button-group>
			</b-button-toolbar>
		</div>
		<div id="all-pokes-container">
			<PokeCard class="poke-container" 
			v-for="(p, index) in data" 
			v-bind:key="p.id"
			v-bind:index="index"
			:pokedata='p'>
			</PokeCard>
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
		data: Array
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
	grid-column-gap: 15px;
	padding: 30px 0px;
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
.party-toolbar{
	margin: 0 10px;
}
</style>