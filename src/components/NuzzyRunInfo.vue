<template>
  <div class="nuzzy-info-container">
    <div>
      <h4>Trainer Name: {{trainerName}}</h4>
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
  </div>
</template>
<script>

export default {
  name: 'NuzzyRunInfo',
  props: {
    trainerName: String,
    createdTime: Number,
    badges: Array,
    eliteFourBeaten: Boolean
  },
  computed: {
    getCreatedTimeText() {
      var dte = new Date(this.createdTime);
      const options = { dateStyle: 'short', timeStyle: 'short' };
      return dte.toLocaleString('en-US', options);
    },
    getProgress() {
      const badgesCompleted = this.badges.filter(x => x).length;
      return this.eliteFourBeaten ? badgesCompleted + 1 : badgesCompleted;
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
  margin-bottom: 15px;
}
.toolbar-container{
  display: grid;
  grid-template-columns: auto auto;
}
.party-toolbar {
  justify-content: flex-end;
}
.run-progress-bar {
  margin-bottom: 15px;
}
</style>