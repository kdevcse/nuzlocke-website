<template>
  <div id="nuzzy-dashboard-container">
    <NuzzyRunInfo
      :trainerName="run.trainerName"
      :badges="run.badges"
      :badgesCompleted="run.badgesCompleted"
      :createdTime="run.created"
      :runId="runId">
    </NuzzyRunInfo>
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
        card>
        <b-tab
          active
          title="Party">
          <NuzzyRunParty
            :party="getPokemonParty"
            :run="run"
            :runId="runId">
          </NuzzyRunParty>
        </b-tab>
        <!--<b-tab title="Box">
              <NuzzyRunBox
                :data="getPokemonBox"
                :version="run.version"
                :run="run"
                :runId="runId">
              </NuzzyRunBox>
            </b-tab>-->
        <b-tab title="Box">
          <NuzzyRunBoxTable
            :run="run"
            :runId="runId"
            :data="getPokemonBox">
          </NuzzyRunBoxTable>
        </b-tab>
        <b-tab title="Deaths">
          <NuzzyRunDeathBox
            :run="run"
            :runId="runId"
            :data="getPokemonDeaths">
          </NuzzyRunDeathBox>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import NuzzyRunInfo from '@/components/NuzzyRunInfo.vue';
import NuzzyRunParty from '@/components/NuzzyRunParty.vue';
//import NuzzyRunBox from '@/components/NuzzyRunBox.vue';
import NuzzyRunBoxTable from '@/components/NuzzyRunBoxTable.vue';
import NuzzyRunDeathBox from '@/components/NuzzyRunDeathBox.vue';

export default {
  name: 'NuzzyDashboardContainer',
  components: {
    NuzzyRunInfo,
    NuzzyRunParty,
    //NuzzyRunBox,
    NuzzyRunBoxTable,
    NuzzyRunDeathBox,
  },
  props: {
    run: Object,
    runId: String,
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

<style scoped>
.header-container {
  text-align: left;
  display: flex;
}
.header-container > h3 {
  margin-bottom: 0;
  flex: 1;
}
</style>