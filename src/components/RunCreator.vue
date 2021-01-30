<template>
  <b-modal
    centered
    size="lg"
    id="create-run-window"
    title="Add a run"
    :ok-disabled="!form.valid"
    ok-title="Create"
    ok-variant="success"
    @ok="handleOk"
    @show="handleShow">
    <b-form
      ref="form"
      @submit.stop.prevent="handleSubmit">
      <div class="form-option-container">
        <label for="create-run-name-input">Run name:</label>
        <b-input
          id="create-run-name-input" 
          v-model="form.name"
          :state="nameValidation"
          @input="checkFormValidity">
        </b-input>
        <b-form-invalid-feedback :state="nameValidation">
          {{nameInputError}}
        </b-form-invalid-feedback>
      </div>
      <div class="form-option-container">
        <label for="create-run-trainer-input">Trainer name:</label>
        <b-input
          id="create-run-trainer-input" 
          v-model="form.trainerName"
          :state="trainerValidation"
          @input="checkFormValidity"
          required>
        </b-input>
      </div>
      <div class="form-option-container">
        <label for="create-run-version-select">Version:</label>
        <b-select
          id="create-run-version-select" 
          required 
          v-model="form.version" 
          :options="versions">
        </b-select>
      </div>
      <b-button
        class="d-none"
        type="submit"></b-button>
    </b-form>
  </b-modal>
</template>
<script>
import { auth, firestore } from 'firebase';
const Pokedex = require('pokeapi-js-wrapper');

export default {
  name: 'RunCreator',
  data: function() {
    return {
      form: {
        name: '',
        trainerName: '',
        version: 'red',
        valid: false
      },
      nameInputError: 'Required',
      nameValidation: false,
      trainerInputError: 'Required',
      trainerValidation: false,
      versions: [
        { value: 'red', text: 'Red'},
        { value: 'blue', text: 'Blue'},
        { value: 'yellow', text: 'Yellow'},
        { value: 'gold', text: 'Gold'},
        { value: 'silver', text: 'Silver'},
        { value: 'crystal', text: 'Crystal'},
        { value: 'ruby', text: 'Ruby'},
        { value: 'sapphire', text: 'Sapphire'},
        { value: 'emerald', text: 'Emerald'},
        { value: 'firered', text: 'FireRed'},
        { value: 'leafgreen', text: 'LeafGreen'},
        { value: 'diamond', text: 'Diamond'},
        { value: 'pearl', text: 'Pearl'},
        { value: 'platinum', text: 'Platinum'},
        { value: 'heartgold', text: 'HeartGold'},
        { value: 'soulsilver', text: 'SoulSilver'},
        { value: 'black', text: 'Black'},
        { value: 'white', text: 'White'},
        { value: 'colosseum', text: 'Colosseum'},
        { value: 'xd', text: 'XD'},
        { value: 'black-2', text: 'Black 2'},
        { value: 'white-2', text: 'White 2'},
        { value: 'x', text: 'X'},
        { value: 'y', text: 'Y'},
        { value: 'omega-ruby', text: 'Omega Ruby'},
        { value: 'alpha-sapphire', text: 'Alpha Sapphire'},
        { value: 'sun', text: 'Sun'},
        { value: 'moon', text: 'Moon'},
        { value: 'ultra-sun', text: 'Ultra Sun'},
        { value: 'ultra-moon', text: 'Ultra Moon'},
        { value: 'lets-go-pikachu', text: 'Let\'s Go Pikachu'},
        { value: 'lets-go-eevee', text: 'Let\'s Go Eevee'},
        { value: 'sword', text: 'Sword'},
        { value: 'shield', text: 'Shield'}
      ]
    }
  },
  methods: {
    checkFormValidity() {
      if(this.form.name === '' || this.form.name === undefined){
        this.nameValidation = false;
        this.nameInputError = 'Required';
      }
      else {
        this.nameValidation = true;
        this.nameInputError = 'Required';
      }

      if(this.form.trainerName === '' || this.form.trainerName === undefined){
        this.trainerValidation = false;
        this.trainerInputError = 'Required';
      }
      else {
        this.trainerValidation = true;
        this.trainerInputError = 'Required';
      }
      //const valid = this.$refs.form.checkValidity();
      this.form.valid = this.nameValidation || this.trainerValidation;
      return this.form.valid;
    },
    handleOk(modalWin) {
      modalWin.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if(!this.checkFormValidity()){
        return;
      }

      const p = new Pokedex.Pokedex();
      p.getVersionByName(this.form.version).then((result) => {
        return p.resource(result.version_group.url);
      }).then( async (result) => {
        firestore().collection(`users/${auth().currentUser.uid}/runs`).add({
          badges: 0,
          version: this.form.version,
          version_group: result.name,
          generation: result.generation.name,
          pokedexes: result.pokedexes.map(pdx => pdx.name),
          regions: result.regions.map(r => r.name),
          name: this.form.name,
          trainerName: this.form.trainerName,
          created: Date.now()
        }).then(() => {
          this.$bvToast.toast(`Run "${this.form.name}" was successfully added`,{
            title: 'Run Added',
            toaster: 'b-toaster-top-right',
            variant: 'success',
            solid: true,
            appendToast: true
          });
        }).catch((error) => {
          this.$bvToast.toast(`There was an error while attempting to add run "${this.form.name}"`,{
            title: 'Error Adding Run',
            toaster: 'b-toaster-top-right',
            variant: 'danger',
            solid: true,
            appendToast: true
          });
          console.error(error);
        });
      }).finally(() => {
        this.$nextTick(() => {
          this.$bvModal.hide('create-run-window');
        });
      });
			
    },
    handleShow() {
      this.resetForm();
    },
    resetForm() {
      this.form = {
        name: '',
        version: 'red',
        valid: false
      };
      this.nameValidation = false;
      this.nameInputError = 'Required';
    }
  }
}
</script>
<style scoped>
.form-option-container {
	margin: 10px 0px;
}
</style>