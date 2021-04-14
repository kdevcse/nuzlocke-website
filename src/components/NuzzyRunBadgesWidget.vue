<template>
  <div>
    <h5 class="badges-txt">
      Badges Completed:
    </h5>
    <div class="badges-container">
      <div 
        v-for="(badge, index) in badges"
        :id="`badge-container-${index}`"
        :key="index"
        class="badge-container">
        <b-tooltip
          variant="success"
          delay="1000"
          :target="`badge-container-${index}`"
          v-if="!badge"
          triggers="hover">
          Click to complete the badge.
        </b-tooltip>
        <b-tooltip
          variant="danger"
          delay="750"
          :target="`badge-container-${index}`"
          v-else
          triggers="hover">
          Click to remove the badge.
        </b-tooltip>
        <svg
          @click="toggleBadge(index)"
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
import { auth, firestore } from 'firebase';
export default {
  name: 'NuzzyRunBadgesWidget',
  props: {
    badges: Array,
    runId: String
  },
  methods: {
    toggleBadge(index) {
      var copyOfBadges = this.badges.slice();
      copyOfBadges[index] = !copyOfBadges[index];
      const query = `users/${auth().currentUser.uid}/runs/${this.runId}`;
      firestore().doc(query).update({ badges: copyOfBadges }).catch(error => {
        console.error(`Error updating badges: ${error}`);
      });
    }
  }
}
</script>
<style scoped>
.badges-txt {
  text-align: left;
}
.badges-container {
  display: grid;
  grid-template-columns: 50px 50px 50px 50px 50px 50px 50px 50px;
  grid-column-gap: 1rem;
  margin-bottom: 20px;
}
.step-container {
  stroke: gray;
  stroke-width:2;
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
    stroke-opacity: 0.8;
    fill: #fff;
  }
  70% {
    stroke-dashoffset: 0;
    fill: #fff;
    stroke-opacity: 0.8;
  }
  100% {
    fill: #218838;
    stroke-opacity: 1;
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