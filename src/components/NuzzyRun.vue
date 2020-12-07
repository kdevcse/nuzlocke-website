<template>
	<div>
		<div id='run-container'>
			<NuzzyParty :data='party_data'></NuzzyParty>
			<NuzzyBox :data='poke_data' :version='version' :runId='run_id'></NuzzyBox>
		</div>
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
		firebase.firestore().doc(`users/${firebase.auth().currentUser.uid}/runs/${this.run_id}`).onSnapshot((doc) => {
			const run = doc.data();
			if(run) {
				this.version = run.version;
				this.poke_data = run.pokemon;
			} 
			else {
				this.$router.push({ name: 'Dashboard' });
				this.$bvToast.toast(`Run with id '${this.run_id}' not found`,{
					title: 'Run Not Found',
					toaster: 'b-toaster-top-right',
					variant: 'danger',
					solid: true,
					appendToast: true
				});
				console.error(`Attempted to retrieve run with ID: '${this.run_id}' and returned NULL`);
			}
		});
  },
  data: function(){
		return {
			run_id: null,
			poke_data: [],
			version: null
		}
	},
	computed: {
		party_data() {
			return this.poke_data.filter(d => d.party > -1);
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