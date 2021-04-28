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
        :class="getEventClass(event.eventType)">
        <h5 class="timeline-header">
          <b-badge 
            class="timeline-header-badge">
            {{getBadgeTxt(event.eventType)}}
          </b-badge>
          <strong>{{getEventDate(event)}}</strong>
        </h5>
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
    getEventDate(event) {
      var dte = new Date(event.date);
      const options = { dateStyle: 'short', timeStyle: 'short' };
      return dte.toLocaleString('en-US', options);
    },
    getBadgeTxt(type) {
      switch(type) {
      case EventTypes.RUNSTATUS:
        return 'Run Started';
      case EventTypes.CAPTURED:
        return 'Captured';
      case EventTypes.DEATH:
        return 'Death';
      case EventTypes.LVLUP:
        return 'Lvl. Up';
      case EventTypes.EVOLVED:
        return 'Evolve';
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
.timeline-header-badge {
  margin-right: 0.5rem;
}
/* run status event */
.run-status.content > strong {
  color: var(--primary);
}
.run-status > .card-header {
  background-color: var(--primary);
}
.run-status > .card-body > .timeline-header > .timeline-header-badge {
  background-color: var(--primary);
}
/* captured event */
.captured.content > strong {
  color: var(--primary);
}
.captured > .card-header {
  background-color: var(--primary);
}
.captured > .card-body > .timeline-header > .timeline-header-badge {
  background-color: green;
}
/* death event */
.poke-death.content > strong {
  color: var(--primary);
}
.poke-death > .card-header {
  background-color: var(--primary);
}
.poke-death > .card-body > .timeline-header > .timeline-header-badge {
  background-color: var(--danger);
}
/* lvl up event */
.poke-lvl-up.content > strong {
  color: var(--primary);
}
.poke-lvl-up > .card-header {
  background-color: var(--primary);
}
.poke-lvl-up > .card-body > .timeline-header > .timeline-header-badge {
  background-color: var(--info);
}
/* evovled event */
.poke-evolved.content > strong {
  color: var(--primary);
}
.poke-evolved > .card-header {
  background-color: var(--primary);
}
.poke-evolved > .card-body > .timeline-header > .timeline-header-badge {
  background-color: var(--orange);
}
.content {
  /* leave at end */
  color: black;
}
.content > strong {
  color: var(--primary);
}
</style>