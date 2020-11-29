<template>
	<div id='box-container'>
		<div class="run-box-title-bar">
			<h3>Pokemon Box</h3>
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

export default {
	name: 'NuzzyBox',
	components: {
		PokeCard
	},
	props: {
		data: Array
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
</style>