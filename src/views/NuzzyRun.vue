<template>
  <div>
    <div
      class="nuzzy-run-container"
      v-if="run">
      <PokeAdder
        :run="run"
        :runId="run_id">
      </PokeAdder>
      <PokeEditor
        :pokedata="getPokemonInEdit"
        :run="run"
        :runId="run_id">
      </PokeEditor>
      <div class="nuzzy-info-title-bar">
        <h1>{{run.runName}} - {{getVersionText}}</h1>
        <NuzzyRunInfo
          :trainerName="run.trainerName"
          :badges="run.badges"
          :badgesCompleted="run.badgesCompleted"
          :createdTime="run.created"
          :runId="run_id">
        </NuzzyRunInfo>
      </div>
      <b-tabs>
        <b-tab
          class="tab-container"
          title="Dashboard">
          <NuzzyRunDashboard
            :run="run"
            :runId="run_id"
            :boxData="box_data">
          </NuzzyRunDashboard>
        </b-tab>
        <b-tab
          class="tab-container"
          title="Timeline">
          <NuzzyRunTimeline>
          </NuzzyRunTimeline>
        </b-tab>
        <b-tab
          class="tab-container"
          title="Stats">
          <NuzzyRunStats>
          </NuzzyRunStats>
        </b-tab>
        <b-tab
          class="tab-container"
          title="Settings">
          <NuzzyRunSettings
            :run="run"
            :runId="run_id"
            @saveSettings="handleSaveSettings">
          </NuzzyRunSettings>
        </b-tab>
      </b-tabs>
    </div>
    <p v-else>
      Run not found
    </p>
  </div>
</template>

<script>
import NuzzyRunSettings from '@/components/NuzzyRunSettings.vue';
import NuzzyRunDashboard from '@/components/NuzzyRunDashboard.vue';
import NuzzyRunTimeline from '@/components/NuzzyRunTimeline.vue';
import NuzzyRunStats from '@/components/NuzzyRunStats.vue';
import NuzzyRunInfo from '@/components/NuzzyRunInfo.vue';
import PokeAdder from '@/components/PokeAdder.vue';
import PokeEditor from '@/components/PokeEditor.vue';
import { auth, firestore } from 'firebase';

export default {
  name: 'NuzzyRun',
  components: {
    NuzzyRunSettings,
    NuzzyRunDashboard,
    NuzzyRunTimeline,
    NuzzyRunStats,
    NuzzyRunInfo,
    PokeAdder,
    PokeEditor
  },
  mounted() {
    this.run_id = this.$route.params.id;

    if(this.$store.state.isLoggedIn) {
      this.initSnapshotForRun();
      this.initSnapshotForPokemon();
    }
  },
  beforeDestroy(){
    if(this.pokemonSnapshot) {
      this.pokemonSnapshot();
    }

    if(this.runSnapshot) {
      this.runSnapshot();
    }
  },
  data: function(){
    return {
      pokemonSnapshot: null,
      runSnapshot: null,
      run: null,
      run_id: null,
      box_data: [],
      badges: []
    }
  },
  computed: {
    getPokemonInEdit() {
      return this.$store.state.pokemonInEdit;
    },
    getVersionText() {
      if (!this.run) {
        return '';
      }

      const dashSplit = this.run.version.split('-');
      let str = '';
      dashSplit.forEach(split => {
        str += (split.charAt(0).toUpperCase() + split.slice(1)) + ' ';
      });

      return str;
    },
  },
  methods: {
    handleSaveSettings(settings) {
      const query = `users/${auth().currentUser.uid}/runs/${this.run_id}`;
      firestore().doc(query).update(settings).then(() => {
        console.log('updated');
      }).catch((error) => {
        console.error(`Error updating settings: ${error}`);
      });
    },
    initSnapshotForRun() {
      const query = `users/${auth().currentUser.uid}/runs/${this.run_id}`;
      this.runSnapshot = firestore().doc(query).onSnapshot((doc) => {
        const runData = doc.data();
        if(runData) {
          this.run = runData;
        } 
        else {
          this.$router.push({ name: 'MyRuns' });
          this.errorHandler(
            'Run Not Found', 
            `Run with id '${this.run_id}' not found`,
            `Attempted to retrieve run with ID: '${this.run_id}' and returned NULL`
          );
        }
      });
    },
    initSnapshotForPokemon() {
      const query = `users/${auth().currentUser.uid}/runs/${this.run_id}/pokemon`;
      this.pokemonSnapshot = firestore().collection(query).onSnapshot((querySnapshot) => {
        const allPokemon = [];

        querySnapshot.forEach((doc) => {
          var pokeObj = doc.data();
          pokeObj.id = doc.id;
          allPokemon.push(pokeObj);
        });
				
        this.box_data = allPokemon;
      });
    },
    errorHandler(titleTxt, toastTxt, consoleTxt){
      this.$bvToast.toast(toastTxt, {
        title: titleTxt,
        toaster: 'b-toaster-top-right',
        variant: 'danger',
        solid: true,
        appendToast: true
      });
      console.error(consoleTxt);
    }
  }
}
</script>
<style scoped>
.nuzzy-run-container{
  margin: 0px auto;
  max-width: 1500px;
}
.nuzzy-info-title-bar {
  text-align: left;
}
.tab-container {
  margin: 0px auto;
  padding: 20px 0px;
  /*max-width: 1500px;*/
  margin-bottom: 50px;
}
.header-container {
  text-align: left;
  display: flex;
}
.header-container > h3 {
  margin-bottom: 0;
  flex: 1;
}
/* .poke-toolbar-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.poke-toolbar {
  justify-content: flex-end;
} */
</style>