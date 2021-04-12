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
    <div class="badges-container">
      <div 
        v-for="(badge, index) in badges"
        :key="index"
        class="badge-container">
        <svg
          viewBox="0 0 57 57"
          :class="{ completed: badge }"
          class="step-container">
          <circle 
            class="step-container-circle" 
            cx="30"
            cy="30"
            r="25"
            transform="rotate(-90 30 30)"></circle>
          <path
            class="step-container-check"
            d="M19 30.2l7.1 7.2 15.5-15.6"
            v-if="badge">
          </path>
          <foreignObject
            x="24.5"
            y="18"
            height="50"
            width="10"
            v-else>
            <p 
              class="step-container-number">
              {{index + 1}}
            </p>
          </foreignObject>
        </svg>
      </div>
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
.badges-container {
  display: grid;
  grid-template-columns: 50px 50px 50px 50px 50px 50px 50px 50px;
  grid-column-gap: 1rem;
}
.step-container {
  stroke: gray;
  stroke-width: 2;
  color: gray;
  fill: transparent;
  text-align: center;
  cursor: pointer;
}
.step-container > foreignObject > p {
  margin: 0;
  font-weight: 600;
}
.step-container:hover {
  stroke: #218838;
  color: #218838;
}
.step-container.completed {
  stroke: #218838;
  animation: complete 1s ease-in-out forwards;
}
.step-container.completed > .step-container-check {
  stroke-width: 3;
  stroke: #fff;
  stroke-dasharray: 35;
  stroke-dashoffset: 35;
  animation: check 0.2s linear forwards;
  animation-delay: 1s;
}
@keyframes complete {
  0% {
    stroke-dasharray: 197.25;
    stroke-dashoffset: 197.25;
    fill: #fff;
  }
  70% {
    stroke-dashoffset: 0;
    fill: #fff;
  }
  100% {
    fill: #218838;
  }
}
@keyframes check {
  from {
    stroke-dasharray: 35;
    stroke-dashoffset: 35;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>