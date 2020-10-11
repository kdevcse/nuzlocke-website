<template>
  <div class="home">
    <NuzzyRuns v-bind:runs="userRuns"></NuzzyRuns>
  </div>
</template>

<script>
import firebase from 'firebase';
import NuzzyRuns from '@/components/NuzzyRuns.vue'

export default {
  name: 'Home',
  components: {
    NuzzyRuns
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
  }
}
</script>
<style scoped>
</style>