<template>
	<div>
		<div v-for="p in poke_data" v-bind:key="p.id">
			<p>{{p.name}}</p>
		</div>
	</div>
</template>

<script>
const Pokedex = require('pokeapi-js-wrapper');

export default {
  name: 'NuzzyRun',
  components: {
  },
  mounted() {
		const run = this.$store.state.runs.find(r => r.run_id == this.$route.params.id);
		if(run){
			this.getAllPokemonData(run);
		} else {
			console.error(`Run with id '${this.$route.params.id}' not found`);
			this.$router.push({ name: 'Home' });
		}
  },
  data: function(){
		return {
			poke_data: []
		}
	},
	methods: {
		getAllPokemonData(run) {
			const pokes = run.pokemon;
			const p = new Pokedex.Pokedex();

			for(var i = 0; i < pokes.length; i++){
				//Then get info for each poke
				p.resource(`/api/v2/pokemon/${pokes[i].pokemon_id}`).then(result => {
					this.poke_data.push(result);
				});
			}
		}
	}
}
</script>
<style scoped>

</style>