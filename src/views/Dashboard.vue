<template>
  <div class="dashboard">
    <RunCreator></RunCreator>
    <div class="dashboard-title-bar">
      <h2>Nuzlocke Runs</h2>
      <b-button v-b-modal.create-run-window pill variant="outline-success">
        + Add a run
      </b-button>
    </div>
    <NuzzyRuns v-bind:runs="userRuns"></NuzzyRuns>
  </div>
</template>

<script>
import firebase from 'firebase';
import NuzzyRuns from '@/components/NuzzyRuns.vue';
import RunCreator from '@/components/RunCreator.vue';

export default {
  name: 'Dashboard',
  components: {
    NuzzyRuns,
    RunCreator
  },
  mounted(){
    firebase.firestore().doc(`users/${firebase.auth().currentUser.uid}`)
    .collection('runs')
    .get().then((result) => {
      const runData = result.docs.map(doc => {
        const data = doc.data();
        data.run_id = doc.id;
        return data;
      });
      console.log(runData);
      this.$store.commit('set_runs', runData);
    });
    /*firebase.firestore().collection('runs')
    .where('guid', '==', firebase.auth().currentUser.uid)
    .get().then((result) => {
      const runData = result.docs.map(doc => doc.data());
      this.$store.commit('set_runs', runData);
    });*/
  },
  computed: {
    userRuns() {
      return this.$store.state.runs;
    }
  },
  methods: {
    handleOk(){
      console.log('Handle OK');
    }
  }
}
</script>
<style scoped>
.dashboard-title-bar {
  text-align: left;
  margin-bottom: 15px;
}
.dashboard-title-bar > h2 {
  border-bottom: black 1px solid;
  margin-bottom: 15px;
  padding-bottom: 15px;
}
</style>