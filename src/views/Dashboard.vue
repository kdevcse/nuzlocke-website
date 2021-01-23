<template>
  <div class="dashboard">
    <RunCreator></RunCreator>
    <b-container class="nuzzy-runs-container">
      <b-row>
        <b-col>
          <h2 id="dashboard-title">
            Nuzlocke Runs
          </h2>
          <b-button
            v-if="isLoggedIn"
            v-b-modal.create-run-window
            variant="outline-success">
            + Add a run
          </b-button>
          <p v-else>
            Please login or sign up to view the dashboard
          </p>
          <NuzzyRuns :runs="userRuns"></NuzzyRuns>
        </b-col>
      </b-row>
    </b-container>
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
}
#dashboard-title {
  border-bottom: black 1px solid;
  margin-bottom: 15px;
  padding-bottom: 15px;
}
</style>