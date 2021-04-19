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
        border-variant="primary"
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
      case EventTypes.CAPTURED:
        return 'Captured Pokemon';
      default:
        return '';
      }
    },
    getEventClass(type) {
      var className = null;
      switch(type) {
      case EventTypes.CAPTURED:
        className = 'captured';
        break;
      default:
        className = null;
        break;
      }

      return className;
    }
  }
}
</script>
<style>
.timeline-container {
  text-align: left;
  margin-bottom: 1rem;
}
/*captured event */
.captured.content > strong {
  color: var(--primary);
}
.captured > .card-header {
  background-color: var(--primary);
}
.captured.card {
  border-color: var(--primary);
  color: white;
}
.content {
  /* leave at end */
  color: black;
}
</style>