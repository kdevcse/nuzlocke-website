<template>
	<div id="all-pokes-container">
		<div class="poke-container" v-for="p in poke_data" v-bind:key="p.id">
			<p class="poke-lvl">Lvl.{{p.lvl}}</p>
			<div class="poke-info-container">
				<img class="poke-img" :src="p.img_url">
				<h3 class="poke-real-name">{{p.real_name}}: "{{p.nickname}}"</h3>
				<p>Caught: {{p.location}}</p>
			</div>
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
			this.getAllRunInfo(run);
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
		getAllRunInfo(run) {
			const p = new Pokedex.Pokedex();
			p.getVersionByName(run.version).then(result => {
				console.log(result);
			});
		},
		getAllPokemonData(run) {
			const pokes = run.pokemon;
			const p = new Pokedex.Pokedex();

			for(var i = 0; i < pokes.length; i++){
				p.resource(`/api/v2/pokemon/${pokes[i].pokemon_id}`).then(this.constructData.bind(null, pokes[i]));
			}
		},
		constructData(pokemon, result) {
			const pokeStruct = {
				real_name: result.name.charAt(0).toUpperCase() + result.name.slice(1),
				nickname: pokemon.nickname,
				lvl: pokemon.lvl,
				location: pokemon.location,
				img_url: result.sprites.front_default
			};
			this.poke_data.push(pokeStruct);
			console.log(result);
		}
	}
}
</script>
<style scoped>
#all-pokes-container {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-column-gap: 50px;
}
.poke-container {
	text-align: left;
	border: 1px solid;
	padding: 10px;
	margin: 10px 0px;
	border-radius: 6px;
	background-color: white;
}
.poke-info-container {
	margin-left: 10px;
	text-align: center;
}
.poke-lvl {
	margin: 0;
}
.poke-real-name{
	margin-top: 5px;
}
.poke-img {
	width: 96px;
	height: 96px;
}
</style>