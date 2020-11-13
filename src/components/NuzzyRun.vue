<template>
	<div>
    <div class="run-party-title-bar">
      <h3>Party</h3>
    </div>
		<div id="all-pokes-container">
			<b-card class="poke-container" 
			v-for="(p, index) in poke_data" 
			v-bind:key="p.id"
			v-bind:index="index"
			border-variant="primary"
			header-bg-variant="primary"
			header-text-variant="white"
			header-tag="header">
				<template #header>
					<div class="align-middle header-container">
						<span class="">{{getCardTitle(p)}}</span>
						<div v-bind:id="getPartyCardId(index)" v-show="!p.loading" class="float-right stats-info-icon-container">
							<b-icon icon="info-circle" class="stats-info-icon"></b-icon>
						</div>
					</div>
				</template>
				<b-skeleton-wrapper :loading="p.loading">
					<template #loading>
					<b-row md="4" no-gutters>
							<b-skeleton-img class="poke-img" width="125px"></b-skeleton-img>
						<b-col class="poke-info-container" no-gutters>
							<b-skeleton></b-skeleton>
							<b-skeleton></b-skeleton>
							<b-skeleton></b-skeleton>
						</b-col>
					</b-row>
					</template>
					<b-row md="4" no-gutters>
							<img class="poke-img" :src="p.img_url">
						<b-col class="poke-info-container" no-gutters>
							<b-card-text v-if="p.nickname"><strong>Nickname:</strong> {{p.nickname}}</b-card-text>
							<b-card-text><strong>Type:</strong> {{getPokeTypes(p.types)}}</b-card-text>
							<b-card-text><strong>Caught:</strong> {{p.location}}</b-card-text>
						</b-col>
					</b-row>
				</b-skeleton-wrapper>
				<b-popover placement="bottom" v-bind:target="getPartyCardId(index)" triggers="hover" title="Base Stats">
					<p v-for="s in p.stats" :key="s.name">{{s.name.toUpperCase()}}: {{s.val}}</p>
				</b-popover>
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
			this.$router.push({ name: 'Dashboard' });
			this.$bvToast.toast(`Run with id '${this.$route.params.id}' not found`,{
				title: 'Run Not Found',
				toaster: 'b-toaster-top-center',
				variant: 'danger',
				solid: true,
				appendToast: true
			});
			console.error(`Attempted to retrieve run with ID: '${this.$route.params.id}' and returned NULL`);
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
		},
		getCardTitle(p) {
			const titleDataExists = p.real_name && p.lvl;
			return titleDataExists ? `${p.real_name} - Lvl.${p.lvl}` : 'Loading...';
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
		},
		getPartyCardId(id){
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
  margin: 0px auto;
  max-width: 1200px;
  padding: 30px 0px;
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
.stats-info-icon-container {
	cursor: pointer;
}
.run-party-title-bar {
  text-align: left;
  margin-bottom: 15px;
}
.run-party-title-bar > h3 {
  border-bottom: black 1px solid;
  margin-bottom: 15px;
  padding-bottom: 15px;
}
</style>