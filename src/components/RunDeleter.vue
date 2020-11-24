<template>
	<b-modal
	centered
	size="lg"
	id="delete-run-window"
	title="Delete run"
	ok-title="Delete"
	ok-variant="danger"
	@ok="handleOk">
		Are you sure you want to delete "{{runName}}"?
	</b-modal>
</template>
<script>
import firebase from 'firebase';

export default {
	name: 'RunDeleter',
	props:{
		runId: String,
		runName: String
	},
	methods:{
		deleteRun(){
			firebase.firestore().doc(`users/${firebase.auth().currentUser.uid}/runs/${this.runId}`).delete().then(() => {
				this.$bvToast.toast(`Run "${this.runName}" was successfully deleted`,{
					title: 'Run Deleted',
					toaster: 'b-toaster-top-right',
					variant: 'success',
					solid: true,
					appendToast: true
				});
			}).catch((error) => {
				this.$bvToast.toast(`There was an error while attempting to delete run "${this.runName}"`,{
					title: 'Error Deleting Run',
					toaster: 'b-toaster-top-right',
					variant: 'danger',
					solid: true,
					appendToast: true
				});
				console.error(error);
			});
		},
		handleOk(){
			this.deleteRun();
		}
	}
}
</script>
<style scoped>
</style>