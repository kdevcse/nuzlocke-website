<template>
  <div class="nuzzy-info-container">
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
        <b-img 
          height="50px"
          width="50px"
          :src="badge"></b-img>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NuzzyInfo',
  props: {
    trainerName: String,
    createdTime: Number,
    badges: Array,
    badgesCompleted: Number,
    eliteFourBeaten: Boolean
  },
  computed: {
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
.badges-container {
  display: grid;
  grid-template-columns: 50px 50px 50px 50px 50px 50px 50px 50px;
  grid-column-gap: 1rem;
}
</style>