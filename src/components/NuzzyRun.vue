<template>
  <div>
    <div 
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
        <h1>{{run.name}} - {{getVersionText}}</h1>
      </div>
      <b-tabs>
        <b-tab
          class="tab-container"
          title="Dashboard">
          <NuzzyRunDashboard
            :run="run"
            :runId="run_id"
            :badges="badges"
            :boxData="box_data">
          </NuzzyRunDashboard>
        </b-tab>
        <b-tab
          class="tab-container"
          title="Settings">
          <NuzzyRunSettings
            :run="run"
            :runId="run_id">
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
import PokeAdder from '@/components/PokeAdder.vue';
import PokeEditor from '@/components/PokeEditor.vue';
import { auth, firestore, storage } from 'firebase';

export default {
  name: 'NuzzyRun',
  components: {
    NuzzyRunSettings,
    NuzzyRunDashboard,
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
    initSnapshotForRun() {
      const query = `users/${auth().currentUser.uid}/runs/${this.run_id}`;
      this.runSnapshot = firestore().doc(query).onSnapshot((doc) => {
        const runData = doc.data();
        if(runData) {
          this.run = runData;
          this.setBadgesForRun();
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
    setBadgesForRun() {
      firestore().collection('leagues').where('region', '==', this.run.main_region).get()
        .then((querySnapshot) => {
          var badges = [];
          querySnapshot.docs.length > 0 ? badges = querySnapshot.docs[0].data().badges : [];
          return badges;
        }).then(async (badges) => {
          var urls = [];
          for (var badge of badges) {
            var b = await this.getBadgeUrl(badge);
            urls.push(b);
          }
          this.badges = urls;
        }).catch((error) => {
          console.log(`Error getting badges for region: ${this.run.main_region}`);
          console.error(error);
          this.badges = [];
        });
    },
    getBadgeUrl(badgeName){
      const path = `${badgeName.charAt(0).toUpperCase() + badgeName.slice(1)}_Badge.png`
      return storage().ref('badges').child(path).getDownloadURL();
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