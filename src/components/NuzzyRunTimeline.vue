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
        <template #header>
          <div class="timeline-header">
            <b-badge 
              class="timeline-header-badge">
              {{getBadgeTxt(event.eventType)}}
            </b-badge>
            <strong>{{getHeaderTxt(event)}}</strong>
          </div>
        </template>
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
      return `${this.getEventHeaderName(event.eventType)} - ${this.getEventDate(event)}`
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
    getEventHeaderName(type) {
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
.run-status.card {
  border-color: var(--primary);
  color: #fff;
}
.run-status > .card-header > .timeline-header > .timeline-header-badge {
  background-color: var(--orange);
}
/* captured event */
.captured.content > strong {
  color: darkslateblue;
}
.captured > .card-header {
  background-color: darkslateblue;
}
.captured.card {
  border-color: darkslateblue;
  color: #fff;
}
.captured > .card-header > .timeline-header > .timeline-header-badge {
  background-color: green;
}
/* death event */
.poke-death.content > strong {
  color: darkslateblue;
}
.poke-death > .card-header {
  background-color: darkslateblue;
}
.poke-death.card {
  border-color: darkslateblue;
  color: #fff;
}
.poke-death > .card-header > .timeline-header > .timeline-header-badge {
  background-color: var(--danger);
}
/* lvl up event */
.poke-lvl-up.content > strong {
  color: darkslateblue;
}
.poke-lvl-up > .card-header {
  background-color: darkslateblue;
}
.poke-lvl-up.card {
  border-color: darkslateblue;
  color: #fff;
}
.poke-lvl-up > .card-header > .timeline-header > .timeline-header-badge {
  background-color: var(--pink);
}
/* evovled event */
.poke-evolved.content > strong {
  color: darkslateblue;
}
.poke-evolved > .card-header {
  background-color: darkslateblue;
}
.poke-evolved.card {
  border-color: darkslateblue;
  color: #fff;
}
.poke-evolved > .card-header > .timeline-header > .timeline-header-badge {
  background-color: var(--info);
}
.content {
  /* leave at end */
  color: black;
}
.content > strong {
  color: var(--primary);
}
</style>