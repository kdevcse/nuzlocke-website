<template>
  <div>
    <div 
      v-if="run"
      id="run-container">
      <PokeAdder
        :run="run"
        :runId="run_id">
      </PokeAdder>
      <PokeEditor
        :pokedata="getPokemonInEdit"
        :run="run"
        :runId="run_id">
      </PokeEditor>
      <NuzzyInfo
        :runName="run.name"
        :trainerName="run.trainerName"
        :version="run.version"
        :badgesCompleted="run.badgesCompleted"
        :createdTime="run.created"
        :runId="run_id">
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
        <b-tabs card>
          <b-tab 
            active
            title="Party">
            <NuzzyParty
              :party="getPokemonParty"
              :run="run"
              :runId="run_id">
            </NuzzyParty>
          </b-tab>
          <!--<b-tab title="Box">
            <NuzzyBox
              :data="getPokemonBox"
              :version="run.version"
              :run="run"
              :runId="run_id">
            </NuzzyBox>
          </b-tab>-->
          <b-tab title="Box">
            <NuzzyBoxTable 
              :run="run"
              :runId="run_id"
              :data="getPokemonBox">
            </NuzzyBoxTable>
          </b-tab>
          <b-tab title="Deaths">
            <NuzzyDeathBox
              :run="run"
              :runId="run_id"
              :data="getPokemonDeaths">
            </NuzzyDeathBox>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
    <p v-else>
      Run not found
    </p>
  </div>
</template>

<script>
import NuzzyInfo from '@/components/NuzzyInfo.vue';
import NuzzyParty from '@/components/NuzzyParty.vue';
//import NuzzyBox from '@/components/NuzzyBox.vue';
import NuzzyBoxTable from '@/components/NuzzyBoxTable.vue';
import NuzzyDeathBox from '@/components/NuzzyDeathBox.vue';
import PokeAdder from '@/components/PokeAdder.vue';
import PokeEditor from '@/components/PokeEditor.vue';
import { auth, firestore } from 'firebase';

export default {
  name: 'NuzzyRun',
  components: {
    NuzzyInfo,
    NuzzyParty,
    //NuzzyBox,
    NuzzyBoxTable,
    NuzzyDeathBox,
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
      box_data: []
    }
  },
  computed: {
    getPokemonInEdit() {
      return this.$store.state.pokemonInEdit;
    },
    getPokemonParty() {
      return this.box_data.filter(p => p.party > -1 && !p.death);
    },
    getPokemonBox() {
      return this.box_data.filter(p => p.party === -1 && !p.death);
    },
    getPokemonDeaths() {
      return this.box_data.filter(p => p.death !== null && p.death !== undefined);
    }
  },
  methods: {
    initSnapshotForRun() {
      const query = `users/${auth().currentUser.uid}/runs/${this.run_id}`;
      this.runSnapshot = firestore().doc(query).onSnapshot((doc) => {
        const runData = doc.data();
        if(runData) {
          this.run = runData;
        } 
        else {
          this.$router.push({ name: 'Dashboard' });
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
#run-container {
  margin: 0px auto;
  padding: 20px 0px;
  max-width: 1500px;
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