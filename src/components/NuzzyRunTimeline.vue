<template>
  <div>
    <div
      v-for="event in sortedEventsByDate"
      :key="event.id"
      class="timeline-container">
      <b-card
        border-variant="primary"
        :header="getHeaderTxt(event)"
        header-bg-variant="primary"
        header-text-variant="white">
        <div :v-if="isCapturedEvent(event)">
          <strong>
            {{getCapturedPokemonName(event)}}
          </strong> was captured at
          <strong>
            {{getLocationTxt(event)}}
          </strong>
        </div>
      </b-card>
    </div>
  </div>
</template>
<script>
import { EventTypes } from '@/models/event.js'

export default {
  name: 'NuzzyRunTimeline',
  props: {
    events: Array
  },
  computed: {
    sortedEventsByDate() {
      return this.events.slice().sort(function (a, b) { return a.date - b.date });
    }
  },
  methods: {
    isCapturedEvent(event) {
      return event.eventType === EventTypes.CAPTURED;
    },
    getCapturedPokemonName(event) {
      const nicknameTxt = event.nickname ? ` (${event.nickname}) ` : '';
      return event.capturedPokemon.charAt(0).toUpperCase() + event.capturedPokemon.slice(1) + nicknameTxt;
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
    getLocationTxt(event) {
      if (!event.location)
        return '';

      const dashSplit = event.location.split('-');
      let str = '';
      dashSplit.forEach(split => {
        str += (split.charAt(0).toUpperCase() + split.slice(1)) + ' ';
      });

      return str;
    }
  }
}
</script>
<style scoped>
.timeline-container {
  text-align: left;
  margin-bottom: 1rem;
}
strong {
  color: var(--primary);
}
</style>