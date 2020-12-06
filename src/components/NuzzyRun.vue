<template>
	<div>
		<div id='run-container'>
			<NuzzyParty :data='poke_data'></NuzzyParty>
			<NuzzyBox :data='poke_data' :version='version'></NuzzyBox>
		</div>
	</div>
</template>

<script>
import NuzzyParty from '@/components/NuzzyParty.vue';
import NuzzyBox from '@/components/NuzzyBox.vue';

const Pokedex = require('pokeapi-js-wrapper');

export default {
	name: 'NuzzyRun',
	components: {
		NuzzyParty,
		NuzzyBox
	},
  mounted() {
		const run = this.$store.state.runs.find(r => r.run_id == this.$route.params.id);
		if(run){
			this.getAllRunInfo(run);
			this.getAllPokemonData(run);
		} else {
			this.$router.push({ name: 'Dashboard' });
			this.$bvToast.toast(`Run with id '${this.$route.params.id}' not found`,{
				title: 'Run Not Found',
				toaster: 'b-toaster-top-right',
				variant: 'danger',
				solid: true,
				appendToast: true
			});
			console.error(`Attempted to retrieve run with ID: '${this.$route.params.id}' and returned NULL`);
		}
  },
  data: function(){
		return {
			poke_data: [],
			version: null
		}
	},
	methods: {
		getAllRunInfo(run) {
			this.version = run.version;
		},
		getAllPokemonData(run) {
			const pokes = run.party;
			const p = new Pokedex.Pokedex();

			for(var i = 0; i < pokes.length; i++){
				this.poke_data.push(pokes[i]);
				this.poke_data[i].loading = true;
				p.resource(`/api/v2/pokemon/${pokes[i].pokemon_id}`).then(this.constructData.bind(null, pokes[i], i));
			}
		},
		constructData(pokemon, index, result) {
			const pokeStruct = {
				real_name: result.name.charAt(0).toUpperCase() + result.name.slice(1),
				nickname: pokemon.nickname,
				lvl: pokemon.lvl,
				location: pokemon.location,
				img_url: result.sprites.other["official-artwork"].front_default,
				stats: result.stats.map(s => {
					return {
						name: s.stat.name,
						val: s.base_stat
					};
				}),
				types: result.types.map(t => {
					return t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
				}),
				loading: false
			};
			this.$set(this.poke_data, index, pokeStruct);
		}
	}
}
</script>
<style scoped>
#run-container {
	margin: 0px auto;
	padding: 20px 0px;
	max-width: 1200px;
}
</style>