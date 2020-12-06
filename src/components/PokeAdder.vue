<template>
	<b-modal
	centered
	size='lg'
	id='add-poke-window'
	title='Add a pokemon'
	:ok-disabled="!form.valid"
	ok-title='Add'
	ok-variant='success'>
		<b-form ref='form'>
			<div class='form-option-container'>
				<label for='add-pokemon-name-input'>Pokemon Name:</label>
				<b-form-input
				id='add-pokemon-name-input'
				v-model='pokename'
				:state='nameIsValid'
				debounce="500"
				required>
				</b-form-input>
				<b-form-invalid-feedback :state="nameIsValid">
					Could not find a valid pokemon with this name
				</b-form-invalid-feedback>
			</div>
			<div class='form-option-container'>
				<label for='add-pokemon-nickname-input'>Nickname:</label>
				<b-input
				id='add-pokemon-nickname-input'
				v-model='form.nickname'
				required>
				</b-input>
			</div>
			<div class='form-option-container'>
				<label for='add-pokemon-lvl-input'>Level:</label>
				<b-input
				id='add-pokemon-lvl-input'
				v-model='form.lvl'
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
	data: function() {
		return {
			searching: false,
			isValidPokemon: null,
			pokename: '',
			form: {
				name: '',
				nickname: '',
				lvl: 1,
				valid: false
			}
		}
	},
	computed: {
		nameIsValid() {
			if (this.isValidPokemon === null) {
				return null;
			}
			
			return this.isValidPokemon || this.searching;
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
			p.getPokemonByName(this.form.name.toLowerCase()).then(() => {
				this.isValidPokemon = true;
				this.searching = false;
				this.form.valid = true;
			}).catch(() => {
				this.isValidPokemon = false;
				this.searching = false;
				this.form.valid = false;
			});
		}
	}
}
</script>
<style scoped>
.form-option-container {
	margin: 10px 0px;
}
</style>