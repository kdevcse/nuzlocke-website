<template>
  <div>
    <div 
      v-if="run"
      id="run-container">
      <PokeAdder
        :version="run.version"
        :runId="run_id">
      </PokeAdder>
      <PokeEditor 
        :version="run.version"
        :runId="run_id">
      </PokeEditor>
      <NuzzyInfo
        :runName="run.name"
        :trainerName="run.trainerName"
        :version="run.version"
        :badges="run.badges"
        :createdTime="run.created"
        :runId="run_id">
      </NuzzyInfo>
      <NuzzyParty
        :party="run.party">
      </NuzzyParty>
      <NuzzyBox
        :data="box_data"
        :version="run.version"
        :runId="run_id">
      </NuzzyBox>
    </div>
    <p v-else>
      Run not found
    </p>
  </div>
</template>

<script>
import NuzzyInfo from '@/components/NuzzyInfo.vue';
import NuzzyParty from '@/components/NuzzyParty.vue';
import NuzzyBox from '@/components/NuzzyBox.vue';
import PokeAdder from '@/components/PokeAdder.vue';
import PokeEditor from '@/components/PokeEditor.vue';
import { auth, firestore } from 'firebase';

export default {
  name: 'NuzzyRun',
  components: {
    NuzzyInfo,
    NuzzyParty,
    NuzzyBox,
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
  max-width: 1200px;
}
.toolbar-container {
  margin-bottom: 25px;
}
</style>