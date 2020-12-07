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
		<PokeCard id='example-pokecard' :pokedata='form'></PokeCard>
		<b-form ref='form' class='form-container'>
			<b-input-group>
				<div class='form-option-container'>
					<label for='add-pokemon-name-input'>Pokemon Name:</label>
					<b-form-input
					id='add-pokemon-name-input'
					v-model='pokename'
					:state='nameIsValid'
					:disabled='waiting'
					debounce="1000"
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
				<div class='form-option-container'>
					<label for='add-pokemon-location-input'>Location:</label>
					<b-form-select
					id='add-pokemon-location-input'
					v-model='form.location'
					:disabled='waiting'
					:options="locationsList"
					selected='Please select a value'
					required>
					</b-form-select>
				</div>
				<div class='form-option-container'>
					<label for='add-pokemon-party-cb'>Assign to Party?</label>
					<b-form-checkbox
					id='add-pokemon-party-cb'
					v-model='includeInParty'
					:disabled='waiting'
					required>
					</b-form-checkbox>
				</div>
				<div class='form-option-container'>
					<label for='add-pokemon-party-slot-input'>Party Slot:</label>
					<b-input
					id='add-pokemon-party-slot-input'
					v-model='form.party'
					:disabled='waiting || !includeInParty'
					min='1'
					max='6'
					required
					type='number'>
					</b-input>
				</div>
			</b-input-group>
		</b-form>
	</b-modal>
</template>
<script>
import PokeCard from '@/components/PokeCard.vue';
import firebase from 'firebase';
const Pokedex = require('pokeapi-js-wrapper');

export default {
	name: 'PokeAdder',
	components: {
		PokeCard
	},
	props:  {
		version: String,
		runId: String
	},
	data: function() {
		return {
			waiting: true,
			includeInParty: false,
			searching: false,
			isValidPokemon: null,
			invalidMsg: '',
			pokename: '',
			form: {
				img_url: null,
				real_name: '',
				nickname: '',
				pokemon_id: null,
				lvl: 1,
				location: '',
				types: null,
				stats: null,
				party: 1,
				valid: false
			},
			pokemonInfo: null,
			locationsList: []
		}
	},
	computed: {
		nameIsValid() {
			if (this.isValidPokemon === null || this.searching) {
				return null;
			}
			
			return this.isValidPokemon;
		},
		pokeData() {
			return {

			}
		}
	},
	watch: {
		pokename: function(newName) {
			this.form.real_name = newName;

			if (!this.form.real_name) {
				this.isValidPokemon = null;
				this.searching = false;
				this.form.valid = false;
				return;
			}

			const p = new Pokedex.Pokedex();
			this.searching = true;
			p.getPokemonByName(this.form.real_name.toLowerCase()).then((result) => {
				if(!this.isFoundInGame(result.game_indices)) {
					this.setInvalidForm('The desired pokemon does not appear in this game');
					return;
				}
				this.isValidPokemon = true;
				this.searching = false;
				this.form.valid = true;
				this.form.img_url = result.sprites.front_default;
				this.form.pokemon_id = result.id;
				this.form.stats = result.stats.map(s => {
					return {
						name: s.stat.name,
						val: s.base_stat
					};
				});
				this.form.types = result.types.map(t => {
					return t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
				});
				this.invalidMsg = '';
				console.log(result);
			}).catch(() => {
				this.setInvalidForm('Pokemon not found');
			});
		}
	},
	methods: {
		resetForm() {
			this.searching = false;
			this.includeInParty = false,
			this.isValidPokemon = null;
			this.pokename = '';
			this.invalidMsg = '';
			this.form = {
				img_url: null,
				real_name: '',
				nickname: '',
				pokemon_id: null,
				lvl: 1,
				location: '',
				types: null,
				stats: null,
				party: 1,
				valid: false
			};
			this.pokemonInfo = null;

			const p = new Pokedex.Pokedex();
			p.getVersionByName(this.version).then((result) => {
				p.resource(result.version_group.url).then((res) => {
					if(res.regions[0]){
						p.resource(res.regions[0].url).then((region) => {
							const list = region.locations.map(r => r.name);
							this.locationsList = list;
							this.waiting = false;
						});
					}
				});
			}).catch(() => {
				this.waiting = false;
			});
			
		},
		constructData(){
			return {
				real_name: this.form.real_name,
				nickname: this.form.nickname,
				pokemon_id: this.form.pokemon_id,
				img_url: this.form.img_url,
				lvl: this.form.lvl,
				types: this.form.types,
				location: this.form.location,
				stats: this.form.stats,
				party: this.includeInParty ? (this.form.party - 1) : -1,
				caught: Date.now()
			}
		},
		handleOk(){
			firebase.firestore().doc(`users/${firebase.auth().currentUser.uid}/runs/${this.runId}`).update({
				pokemon: firebase.firestore.FieldValue.arrayUnion(this.constructData())
			});
		},
		setInvalidForm(msg){
			this.invalidMsg = msg;
			this.searching = false;
			this.isValidPokemon = false;
			this.form.valid = false;
			this.form.img_url = null;
			this.pokemonInfo = null;
		},
		isFoundInGame(allGames) {
			for(let i = 0; i < allGames.length; i++) {
				if (allGames[i].version.name === this.version) {
					return true;
				}
			}

			return false;
		}
	}
}
</script>
<style scoped>
#example-pokecard {
	width: 50%;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 15px;
}
.form-option-container {
	margin: 5px 0px;
	width: 100%;
}
.form-img-container {
	margin-top: 15px;
	margin-left: auto;
	margin-right: auto;
}
</style>