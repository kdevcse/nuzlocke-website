<template>
    <div id="runs-container">
      <b-card v-for="run in runs" 
        v-bind:key="run.run_id" 
        class="run-container text-left"  
        @click="openRun(run.run_id)"
        :header="run.name"
        border-variant="primary"
        header-bg-variant="primary"
        header-text-variant="white">
        <b-card-text>Version: {{run.version}}</b-card-text>
        <b-card-text>Badges: {{run.badges}}</b-card-text>
      </b-card>
    </div>
</template>

<script>

export default {
  name: 'NuzzyRuns',
  components: {
  },
	props: ['runs'],
	methods: {
		openRun(runId) {
			this.$router.push({ name: 'Run', params: { id: `${runId}` } });
		}
	}
}
</script>
<style scoped>
.run-container {
  text-align: left;
  border-radius: 6px;
  margin: 15px 0px;
}
.run-container:hover {
  cursor: pointer;
}
</style>