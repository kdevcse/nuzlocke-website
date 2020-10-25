<template>
	<div>
		<div id="all-pokes-container">
			<b-card class="poke-container" 
				v-for="p in poke_data" 
				v-bind:key="p.id"
				border-variant="primary"
				header-bg-variant="primary"
				header-text-variant="white"
				:header="getCardTitle(p)">
				<b-row md="4" no-gutters>
						<img class="poke-img" :src="p.img_url">
					<b-col class="poke-info-container" no-gutters>
						<b-card-text>Type: {{getPokeTypes(p.types)}}</b-card-text>
						<b-card-text>Caught: {{p.location}}</b-card-text>
						<b-card-text v-for="s in p.stats" :key="s.name">{{s.name.toUpperCase()}}: {{s.val}}</b-card-text>
					</b-col>
				</b-row>
			</b-card>
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
			this.$router.push({ name: 'Dashboard' });
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
			const pokes = run.party;
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
				img_url: result.sprites.other["official-artwork"].front_default,
				stats: result.stats.map(s => {
					return {
						name: s.stat.name,
						val: s.base_stat
					};
				}),
				types: result.types.map(t => {
					return t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
				})
			};
			this.poke_data.push(pokeStruct);
			console.log(result);
		},
		getCardTitle(p) {
			return `${p.real_name}: "${p.nickname}" - Lvl.${p.lvl}`;
		},
		getPokeTypes(types){
			if(!types || types.length === 0)
				return;

			let msg = types[0];
			if(types.length > 1){
				for(let i = 1; i < types.length; i++){
					msg += `/${types[i]}`
				}
			}

			return msg;
		}
	}
}
</script>
<style scoped>
#all-pokes-container {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-column-gap: 15px;
}
.poke-container {
	text-align: left;
	overflow: hidden;
	border: 1px solid;
	border-radius: 6px;
	background-color: #fff;
}
.poke-info-container {
	text-align: left;
	margin-left: 10px;
	padding: 10px;
}
.poke-lvl {
	margin: 0;
}
.poke-real-name{
	margin-top: 10px;
}
.poke-img {
	height: 125px;
	width: 125px;
	padding: 10px;
	margin-left: auto;
	margin-right: auto;

}
.card-body {
	padding: 5px;
}
</style>