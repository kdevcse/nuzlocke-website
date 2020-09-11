<template>
    <div id="runs-container">
      <div v-for="run in runs" v-bind:key="run.run_id" class="run-container"  @click="openRun(run.run_id)">
        <h3>{{run.name}}</h3>
        <h4>Version: {{run.version}}</h4>
        <h4>Badges: {{run.badges}}</h4>
      </div>
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
#runs-container {
  padding: 0px 30px;
}
.run-container {
  text-align: left;
  padding: 10px;
  border: 1px solid slategrey;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 6px;
}
.run-container:hover {
  cursor: pointer;
  border-color: #80ED99;
}
</style>