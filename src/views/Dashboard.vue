<template>
  <div class="dashboard">
    <RunCreator></RunCreator>
    <div class="nuzzy-runs-container">
      <h2>Nuzlocke Runs</h2>
      <b-button v-if="isLoggedIn" v-b-modal.create-run-window variant="outline-success">
        + Add a run
      </b-button>
      <p v-else>Please login or sign up to view the dashboard</p>
      <NuzzyRuns v-bind:runs="userRuns"></NuzzyRuns>
    </div>
  </div>
</template>

<script>
import NuzzyRuns from '@/components/NuzzyRuns.vue';
import RunCreator from '@/components/RunCreator.vue';

export default {
  name: 'Dashboard',
  components: {
    NuzzyRuns,
    RunCreator
  },
  computed: {
    userRuns() {
      return this.$store.state.runs;
    },
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    }
  }
}
</script>
<style scoped>
.nuzzy-runs-container {
  text-align: left;
  margin-bottom: 15px;
  margin: 0 auto;
  max-width: 936px;
}
.nuzzy-runs-container > h2 {
  border-bottom: black 1px solid;
  margin-bottom: 15px;
  padding-bottom: 15px;
}
</style>