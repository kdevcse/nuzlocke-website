<template>
  <div class="nuzzy-info-container">
    <div class="nuzzy-info-title-bar">
      <div class="toolbar-container">
        <h1>{{runName}} - {{getVersionText}}</h1>
        <div class="run-toolbar">
          <b-button-toolbar class="party-toolbar">
            <b-button-group size="sm">
              <b-button>
                Settings
              </b-button>
            </b-button-group>
          </b-button-toolbar>
        </div>
      </div>
    </div>
    <div>
      <p>Trainer Name: {{trainerName}}</p>
      <p>Run Started: {{getCreatedTimeText}}</p>
      <b-progress
        class="run-progress-bar"
        height="20px"
        max="9">
        <b-progress-bar
          :value="getProgress"
          :variant="getProgressVariant"
          :label="`${((getProgress / 9) * 100).toFixed(2)}%`"></b-progress-bar>
      </b-progress>
    </div>
    <div class="badges-container">
      <div 
        v-for="badge in badges"
        :key="badge.id"
        class="badge-container">
        <b-img></b-img>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NuzzyInfo',
  props: {
    runName: String,
    trainerName: String,
    createdTime: Number,
    badges: Array,
    badgesCompleted: Number,
    version: String,
    eliteFourBeaten: Boolean
  },
  computed: {
    getVersionText() {
      const dashSplit = this.version.split('-');
      let str = '';
      dashSplit.forEach(split => {
        str += (split.charAt(0).toUpperCase() + split.slice(1)) + ' ';
      });

      return str;
    },
    getCreatedTimeText() {
      var dte = new Date(this.createdTime);
      const options = { dateStyle: 'short', timeStyle: 'short' };
      return dte.toLocaleString('en-US', options);
    },
    getProgress() {
      return this.eliteFourBeaten ? this.badgesCompleted + 1 : this.badgesCompleted;
    },
    getProgressVariant() {
      const progress = ((this.getProgress / 9) * 100);
      let variant = 'info';
      
      switch(true){
      case progress < 25:
        variant = 'danger';
        break;
      case progress < 50:
        variant = 'warning';
        break;
      case progress < 75:
        variant = 'info';
        break;
      case progress === 100:
        variant = 'success';
        break;
      default:
        variant = 'info';
        break;
      }

      return variant;
    }
  }
}
</script>
<style scoped>
.nuzzy-info-container {
  text-align: left;
  margin-bottom: 30px;
}
.nuzzy-info-title-bar {
	border-bottom: black 1px solid;
  margin-bottom: 15px;
}
.toolbar-container{
  display: grid;
  grid-template-columns: auto auto;
}
.party-toolbar {
  justify-content: flex-end;
}
.run-toolbar {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.run-progress-bar {
  margin-bottom: 15px;
}
</style>