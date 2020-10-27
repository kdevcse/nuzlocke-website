<template>
    <div id="runs-container">
      <RunDeleter :runId="runToDelete.id" :runName="runToDelete.name"></RunDeleter>
      <b-card v-for="run in runs" 
        v-bind:key="run.run_id" 
        class="run-container text-left"
        border-variant="primary"
        header-bg-variant="primary"
        header-text-variant="white">
        <template #header>
          <div class="align-middle header-container">
            <span class="header-title" @click="openRun(run.run_id)">{{run.name}}</span>
            <div class="delete-run-button"
            @mouseenter="fillTrash(run, true)"
            @mouseleave="fillTrash(run, false)"
            @click="deleteRun(run.run_id, run.name)">
              <b-icon v-if="getFillStatus(run)" title="Delete run" icon="trash-fill" class="run-trash-icon"></b-icon>
              <b-icon v-else icon="trash" class="run-trash-icon"></b-icon>
            </div>
          </div>
        </template>
        <div class="run-body">
          <b-card-text><strong>Version:</strong> {{run.version}}</b-card-text>
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
      trashIsHovered: false,
      nuzzyRuns: this.runs.map(r => {
        r.trashIsHovered = false;
        return r;
      }),
      runToDelete: { name: '', id: ''}
    }
  },
  props: ['runs'],
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
    fillTrash(run, needsToFill){
      for(let i = 0; i < this.nuzzyRuns.length; i++) {
        if(this.nuzzyRuns[i].run_id === run.run_id) {
          let copyOfRun = this.nuzzyRuns[i];
          copyOfRun.trashIsHovered = needsToFill;
          this.$set(this.nuzzyRuns, i, copyOfRun);
        }
      }
    },
    getFillStatus(run){
      for(let i = 0; i < this.nuzzyRuns.length; i++) {
        if(this.nuzzyRuns[i].run_id === run.run_id) {
          return this.nuzzyRuns[i].trashIsHovered;
        }
      }
    }
	}
}
</script>
<style scoped>
#runs-container{
  margin: 0px auto;
  max-width: 936px;
  padding: 30px 0px;
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
</style>