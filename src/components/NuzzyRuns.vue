<template>
    <div id="runs-container">
      <b-card v-for="run in runs" 
        v-bind:key="run.run_id" 
        class="run-container text-left"
        border-variant="primary"
        header-bg-variant="primary"
        header-text-variant="white">
        <template #header>
          <div class="align-middle header-container">
            <span class="">{{run.name}}</span>
            <div @mouseenter="fillTrash(run, true)" @mouseleave="fillTrash(run, false)" @click="deleteRun(run.run_id)" class="delete-run-button">
              <b-icon v-if="getFillStatus(run)" title="Delete run" icon="trash-fill" class="run-trash-icon"></b-icon>
              <b-icon v-else icon="trash" class="run-trash-icon"></b-icon>
            </div>
          </div>
        </template>
        <div class="run-body" @click="openRun(run.run_id)">
          <b-card-text>Version: {{run.version}}</b-card-text>
          <b-card-text>Badges: {{run.badges}}</b-card-text>
        </div>
      </b-card>
    </div>
</template>

<script>

export default {
  name: 'NuzzyRuns',
  data: function() {
    return {
      trashIsHovered: false,
      nuzzyRuns: this.runs.map(r => {
        r.trashIsHovered = false;
        return r;
      })
    }
  },
  props: ['runs'],
	methods: {
		openRun(runId) {
			this.$router.push({ name: 'Run', params: { id: `${runId}` } });
    },
    deleteRun(runId){
      console.log(`Delete run: ${runId}`);
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
.run-body:hover {
  cursor: pointer;
}
.delete-run-button {
  float: right;
  cursor: pointer;
}
</style>