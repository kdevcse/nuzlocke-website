<template>
	<div>
		<p>{{this.poke_data.name}}</p>
	</div>
</template>

<script>
const Pokedex = require('pokeapi-js-wrapper');

export default {
  name: 'NuzzyRun',
  components: {
  },
  mounted() {
		const p = new Pokedex.Pokedex();
		console.log(this.$route.params.id); //Run_id: Now make request for data from run

		//Then get info for each poke
    p.getPokemonByName('golduck').then(result => {
			this.poke_data = result;
			console.log(this.poke_data);
    });
  },
  data: function(){
		return {
			poke_data: {}
		}
  }
}
</script>
<style scoped>

</style>