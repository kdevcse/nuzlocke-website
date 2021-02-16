<template>
  <div id="nuzzy-dashboard-container">
    <NuzzyInfo
      :trainerName="run.trainerName"
      :badges="badges"
      :badgesCompleted="run.badgesCompleted"
      :createdTime="run.created"
      :runId="runId">
    </NuzzyInfo>
    <b-card
      border-variant="primary"
      header-bg-variant="primary"
      header-text-variant="white"
      header-tag="header"
      no-body>
      <template #header>
        <div class="align-middle header-container">
          <h3>Pokemon</h3>
          <b-button-toolbar class="poke-toolbar float-right">
            <b-button-group size="sm">
              <b-button
                variant="success"
                v-b-modal.add-poke-window>
                Add Pokemon
              </b-button>
            </b-button-group>
          </b-button-toolbar>
        </div>
      </template>
      <b-tabs
        pills
        card
        vertical>
        <b-tab
          active
          title="Party">
          <NuzzyParty
            :party="getPokemonParty"
            :run="run"
            :runId="runId">
          </NuzzyParty>
        </b-tab>
        <!--<b-tab title="Box">
              <NuzzyBox
                :data="getPokemonBox"
                :version="run.version"
                :run="run"
                :runId="runId">
              </NuzzyBox>
            </b-tab>-->
        <b-tab title="Box">
          <NuzzyBoxTable
            :run="run"
            :runId="runId"
            :data="getPokemonBox">
          </NuzzyBoxTable>
        </b-tab>
        <b-tab title="Deaths">
          <NuzzyDeathBox
            :run="run"
            :runId="runId"
            :data="getPokemonDeaths">
          </NuzzyDeathBox>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import NuzzyInfo from '@/components/NuzzyInfo.vue';
import NuzzyParty from '@/components/NuzzyParty.vue';
//import NuzzyBox from '@/components/NuzzyBox.vue';
import NuzzyBoxTable from '@/components/NuzzyBoxTable.vue';
import NuzzyDeathBox from '@/components/NuzzyDeathBox.vue';

export default {
  name: 'NuzzyDashboardContainer',
  components: {
    NuzzyInfo,
    NuzzyParty,
    //NuzzyBox,
    NuzzyBoxTable,
    NuzzyDeathBox,
  },
  props: {
    run: Object,
    runId: String,
    badges: Array,
    boxData: Array
  },
  computed: {
    getPokemonParty() {
      return this.boxData.filter(p => p.party > -1 && !p.death);
    },
    getPokemonBox() {
      return this.boxData.filter(p => p.party === -1 && !p.death);
    },
    getPokemonDeaths() {
      return this.boxData.filter(p => p.death !== null && p.death !== undefined);
    },
  }
};
</script>

<style>
</style>