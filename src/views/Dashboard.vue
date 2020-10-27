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