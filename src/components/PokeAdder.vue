<template>
	<b-modal
	centered
	size='lg'
	id='add-poke-window'
	title='Add a pokemon'
	:ok-disabled="!form.valid"
	ok-title='Add'
	ok-variant='success'
  @ok="handleOk"
	@show="resetForm">
		<b-form ref='form'>
			<div>
				<b-img rounded v-if='imgUrl' :src='imgUrl' height='125px' width='125px'></b-img>
				<b-skeleton-img v-else no-aspect width="125px" height="125px" class="poke-img"></b-skeleton-img>
			</div>
			<div class='form-option-container'>
				<label for='add-pokemon-name-input'>Pokemon Name:</label>
				<b-form-input
				id='add-pokemon-name-input'
				v-model='pokename'
				:state='nameIsValid'
				:disabled='waiting'
				debounce="500"
				required>
				</b-form-input>
				<b-form-invalid-feedback :state="nameIsValid">
					{{invalidMsg}}
				</b-form-invalid-feedback>
			</div>
			<div class='form-option-container'>
				<label for='add-pokemon-nickname-input'>Nickname:</label>
				<b-input
				id='add-pokemon-nickname-input'
				v-model='form.nickname'
				:disabled='waiting'
				required>
				</b-input>
			</div>
			<div class='form-option-container'>
				<label for='add-pokemon-lvl-input'>Level:</label>
				<b-input
				id='add-pokemon-lvl-input'
				v-model='form.lvl'
				:disabled='waiting'
				min='1'
				max='100'
				required
				type='number'>
				</b-input>
			</div>
		</b-form>
	</b-modal>
</template>
<script>
const Pokedex = require('pokeapi-js-wrapper');

export default {
	name: 'PokeAdder',
	props:  {
		version: String
	},
	data: function() {
		return {
			waiting: true,
			imgUrl: null,
			searching: false,
			isValidPokemon: null,
			invalidMsg: '',
			pokename: '',
			form: {
				name: '',
				nickname: '',
				lvl: 1,
				valid: false
			},
			pokemonInfo: null
		}
	},
	computed: {
		nameIsValid() {
			if (this.isValidPokemon === null || this.searching) {
				return null;
			}
			
			return this.isValidPokemon;
		}
	},
	watch: {
		pokename: function(newName) {
			this.form.name = newName;

			if (!this.form.name) {
				this.isValidPokemon = null;
				this.searching = false;
				this.form.valid = false;
				return;
			}

			const p = new Pokedex.Pokedex();
			this.searching = true;
			p.getPokemonByName(this.form.name.toLowerCase()).then((result) => {
				if(!this.isFoundInGame(result.game_indices)) {
					this.setInvalidForm('The desired pokemon does not appear in this game');
					return;
				}
				this.isValidPokemon = true;
				this.searching = false;
				this.form.valid = true;
				this.imgUrl = result.sprites.front_default;
				this.invalidMsg = '';
				console.log(result);
			}).catch(() => {
				this.setInvalidForm('Pokemon not found');
			});
		}
	},
	methods: {
		resetForm() {
			this.imgUrl = null;
			this.searching = false;
			this.isValidPokemon = null;
			this.pokename = '';
			this.form = {
				name: '',
				nickname: '',
				lvl: 1,
				valid: false
			};
			this.pokemonInfo = null;

			//const p = new Pokedex.Pokedex(); somehow need to correlate routes to game
			
			this.waiting = false;
		},
		handleOk(){
			console.log(this.form);
		},
		setInvalidForm(msg){
			this.invalidMsg = msg;
			this.imgUrl = null;
			this.searching = false;
			this.isValidPokemon = false;
			this.form.valid = false;
			this.pokemonInfo = null;
		},
		isFoundInGame(allGames) {
			for(let i = 0; i < allGames.length; i++) {
					console.log(allGames[i].version.name);
				if (allGames[i].version.name === this.version) {
					console.log(allGames[i].version.name);
					return true;
				}
			}
			console.log(allGames.length);
			return false;
		}
	}
}
</script>
<style scoped>
.form-option-container {
	margin: 10px 0px;
}
.poke-img {
	padding: 0;
}
</style>