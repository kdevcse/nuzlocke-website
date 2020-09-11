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
    firebase.firestore().collection('runs')
    .where('guid', '==', firebase.auth().currentUser.uid)
    .get().then((result) => {
      const runData = result.docs.map(doc => doc.data());
      this.$store.commit('set_runs', runData);
    });
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