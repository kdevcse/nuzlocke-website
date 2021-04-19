<template>
  <div>
    <p v-if="sortedEventsByDate.length === 0">
      No events were found
    </p>
    <div
      v-for="event in sortedEventsByDate"
      :key="event.id"
      class="timeline-container">
      <b-card
        :class="getEventClass(event.eventType)"
        :header="getHeaderTxt(event)">
        <div class="content-container">
          <span 
            :class="getEventClass(event.eventType)"
            class="content"
            v-html="event.html">
          </span>
        </div>
      </b-card>
    </div>
  </div>
</template>
<script>
import { EventTypes } from '@/models/events/event.js'

export default {
  name: 'NuzzyRunTimeline',
  props: {
    events: Array
  },
  computed: {
    sortedEventsByDate() {
      return this.events ? this.events.slice().sort(function (a, b) { return a.date - b.date }) : [];
    },
  },
  methods: {
    isCapturedEvent(event) {
      return event.eventType === EventTypes.CAPTURED;
    },
    getHeaderTxt(event) {
      return `${this.getEventTypeName(event.eventType)} - ${this.getEventDate(event)}`
    },
    getEventDate(event) {
      var dte = new Date(event.date);
      const options = { dateStyle: 'short', timeStyle: 'short' };
      return dte.toLocaleString('en-US', options);
    },
    getEventTypeName(type) {
      switch(type) {
      case EventTypes.RUNSTATUS:
        return 'Run Status';
      case EventTypes.CAPTURED:
        return 'Pokemon Status';
      case EventTypes.DEATH:
        return 'Pokemon Status';
      case EventTypes.LVLUP:
        return 'Pokemon Status';
      case EventTypes.EVOLVED:
        return 'Pokemon Status';
      default:
        return '';
      }
    },
    getEventClass(type) {
      switch(type) {
      case EventTypes.RUNSTATUS:
        return 'run-status';
      case EventTypes.CAPTURED:
        return 'captured';
      case EventTypes.DEATH:
        return 'poke-death';
      case EventTypes.LVLUP:
        return 'poke-lvl-up';
      case EventTypes.EVOLVED:
        return 'poke-evolved';
      default:
        return null
      }
    }
  }
}
</script>
<style>
.timeline-container {
  text-align: left;
  margin-bottom: 1rem;
}
/* run status event */
.run-status.content > strong {
  color: var(--primary);
}
.run-status > .card-header {
  background-color: var(--primary);
}
.run-status.card {
  border-color: var(--primary);
  color: white;
}
/* captured event */
.captured.content > strong {
  color: var(--success);
}
.captured > .card-header {
  background-color: var(--info);
}
.captured.card {
  border-color: var(--info);
  color: white;
}
/* death event */
.poke-death.content > strong {
  color: var(--danger);
}
.poke-death > .card-header {
  background-color: var(--info);
}
.poke-death.card {
  border-color: var(--info);
  color: white;
}
/* lvl up event */
.poke-lvl.content > strong {
  color: var(--info);
}
.poke-lvl > .card-header {
  background-color: var(--info);
}
.poke-lvl.card {
  border-color: var(--info);
  color: white;
}
/* evovled event */
.poke-evolved.content > strong {
  color: var(--purple);
}
.poke-evolved > .card-header {
  background-color: var(--info);
}
.poke-evolved.card {
  border-color: var(--info);
  color: white;
}
.content {
  /* leave at end */
  color: black;
}
</style>