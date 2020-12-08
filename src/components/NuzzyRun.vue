<template>
	<div>
		<div v-if='isLoggedIn' id='run-container'>
			<NuzzyParty :party='party_data'></NuzzyParty>
			<NuzzyBox :data='box_data' :version='version' :runId='run_id'></NuzzyBox>
		</div>
		<p v-else> Please login to view this run</p>
	</div>
</template>

<script>
import NuzzyParty from '@/components/NuzzyParty.vue';
import NuzzyBox from '@/components/NuzzyBox.vue';
import firebase from 'firebase';

export default {
	name: 'NuzzyRun',
	components: {
		NuzzyParty,
		NuzzyBox
	},
  mounted() {
		this.run_id = this.$route.params.id;

		if(this.$store.state.isLoggedIn) {
			this.initSnapshotForRun();
			this.initSnapshotForPokemon();
		}
	},
	beforeDestroy(){
		if(this.pokemonSnapshot) {
			this.pokemonSnapshot();
		}

		if(this.runSnapshot) {
			this.runSnapshot();
		}
	},
	computed: {
		isLoggedIn() {
			return this.$store.state.isLoggedIn;
		}
	},
  data: function(){
		return {
			pokemonSnapshot: null,
			runSnapshot: null,
			run_id: null,
			box_data: [],
			party_data: {},
			version: null
		}
	},
	methods: {
		initSnapshotForRun() {
			const query = `users/${firebase.auth().currentUser.uid}/runs/${this.run_id}`;
			this.runSnapshot = firebase.firestore().doc(query).onSnapshot((doc) => {
				const run = doc.data();
				if(run) {
					this.version = run.version;
					this.party_data = run.party;
				} 
				else {
					this.$router.push({ name: 'Dashboard' });
					this.errorHandler(
						'Run Not Found', 
						`Run with id '${this.run_id}' not found`,
						`Attempted to retrieve run with ID: '${this.run_id}' and returned NULL`
					);
				}
			});
		},
		initSnapshotForPokemon() {
			const query = `users/${firebase.auth().currentUser.uid}/runs/${this.run_id}/pokemon`;
			this.pokemonSnapshot = firebase.firestore().collection(query).onSnapshot((querySnapshot) => {
				const allPokemon = [];

				querySnapshot.forEach((doc) => {
					allPokemon.push(doc.data());
				});
				
				this.box_data = allPokemon;
			});
		},
		errorHandler(titleTxt, toastTxt, consoleTxt){
			this.$bvToast.toast(toastTxt, {
				title: titleTxt,
				toaster: 'b-toaster-top-right',
				variant: 'danger',
				solid: true,
				appendToast: true
			});
			console.error(consoleTxt);
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