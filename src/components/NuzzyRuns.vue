<template>
  <div id="runs-container">
    <RunDeleter :runId="runToDelete.id" :runName="runToDelete.name"></RunDeleter>
    <b-card v-for="run in sortedRuns" 
      v-bind:key="run.run_id" 
      class="run-container text-left"
      border-variant="primary"
      header-bg-variant="primary"
      header-text-variant="white">
      <template #header>
        <div class="align-middle header-container">
          <span class="header-title" @click="openRun(run.run_id)">{{run.name}}</span>
          <div class="delete-run-button" @click="deleteRun(run.run_id, run.name)">
            <b-icon title="Delete run" icon="trash-fill" class="run-trash-icon-fill"></b-icon>
            <b-icon title="Delete run" icon="trash" class="run-trash-icon"></b-icon>
          </div>
        </div>
      </template>
      <div class="run-body">
        <b-card-text><strong>Trainer:</strong> {{run.trainerName}}</b-card-text>
        <b-card-text><strong>Created:</strong> {{getCreatedTimestamp(run.created)}}</b-card-text>
        <b-card-text><strong>Version:</strong> {{getVersionRunTxt(run.version)}}</b-card-text>
        <b-card-text><strong>Badges:</strong> {{run.badges}}</b-card-text>
      </div>
    </b-card>
  </div>
</template>

<script>
import RunDeleter from '@/components/RunDeleter.vue';

export default {
  name: 'NuzzyRuns',
  components: {
    RunDeleter
  },
  data: function() {
    return {
      runToDelete: { name: '', id: ''}
    }
  },
  props: {
    runs: Array
  },
  computed: {
    sortedRuns() {
      return this.runs.slice().sort(function (a, b) {
        return a.created - b.created;
      });
    }
  },
	methods: {
		openRun(runId) {
			this.$router.push({ name: 'Run', params: { id: `${runId}` } });
    },
    deleteRun(runId, runName){
      this.runToDelete = {
        name: runName,
        id: runId
      };
      this.$bvModal.show('delete-run-window');
    },
    getCreatedTimestamp(milliseconds) {
      var d = new Date(milliseconds);
      return `${d.toLocaleString('en-US')}`;
    },
    getVersionRunTxt(version) {
			const dashSplit = version.split('-');
			let str = '';
			dashSplit.forEach(split => {
				str += (split.charAt(0).toUpperCase() + split.slice(1)) + ' ';
			});

			return str;
    }
	}
}
</script>
<style scoped>
#runs-container{
  margin: 0px auto;
  margin-bottom: 30px;
}
.run-container {
  text-align: left;
  border-radius: 6px;
  margin: 15px 0px;
}
.header-title:hover {
  cursor: pointer;
  text-decoration: underline;
}
.delete-run-button {
  float: right;
  cursor: pointer;
}
.delete-run-button > .run-trash-icon-fill {
  display: none;
}
.delete-run-button > .run-trash-icon {
  display: inherit;
}
.delete-run-button:hover > .run-trash-icon-fill {
  display: inherit;
}
.delete-run-button:hover > .run-trash-icon {
  display: none;
}
</style>