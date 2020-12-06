<template>
	<div id='box-container'>
		<PokeAdder :version='version'></PokeAdder>
		<div class="run-box-title-bar">
			<h3>Pokemon Box</h3>
			<b-button-toolbar class="party-toolbar">
				<b-button-group size="sm">
					<b-button v-b-modal.add-poke-window>+</b-button>
				</b-button-group>
			</b-button-toolbar>
		</div>
		<div id='box'>
			<PokeCard class="pokebox-card"
			v-for="(pokemon, index) in data"
			:key="pokemon.id"
			:pokedata='pokemon'
			:index='index'>
			</PokeCard>
		</div>
	</div>
</template>
<script>
import PokeCard from '@/components/PokeCard.vue';
import PokeAdder from '@/components/PokeAdder.vue';

export default {
	name: 'NuzzyBox',
	components: {
		PokeCard,
    PokeAdder
	},
	props: {
		data: Array,
		version: String
	}
}
</script>
<style scoped>
.run-box-title-bar {
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