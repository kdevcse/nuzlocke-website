<template>
  <div
    id="app-container"
    :class="{darkmode: userSettings.dark}">
    <div id="app">
      <Navbar></Navbar>
      <router-view id="current-view" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue';
import { auth, firestore } from 'firebase';

export default {
  name: 'App',
  components: {
    Navbar
  },
  beforeMount() {
    this.initOnAuthChange();
  },
  computed: {
    userSettings() {
      return this.$store.state.userSettings;
    }
  },
  methods: {
    initOnAuthChange() {
      auth().onAuthStateChanged((user) => {
        if (user) {
          this.$store.commit('set_login_status', true);
          this.initRunsSnapshot();

          firestore().doc(`users/${user.uid}`).get().then((doc) => {
            this.$store.commit('set_user_settings', doc.data());
          }).catch((error) => {
            this.errorToast(
              error,
              'Failed to retieve user data',
              'The data for this user could not be properly retrieved'
            );
          });
        }
        else {
          this.$store.commit('set_login_status', false);
          this.$store.commit('set_user_settings', {});
          this.$store.commit('set_runs', []);
        }
      });
    },
    initRunsSnapshot() {
      const query = `users/${auth().currentUser.uid}/runs`;
      firestore().collection(query).onSnapshot((querySnapshot) => {
        let runData = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          data.run_id = doc.id;
          runData.push(data);
        });
        this.$store.commit('set_runs', runData);
      });
    },
    errorToast(error, title, msg) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(`Error Code: ${errorCode}`);
      console.error(`Error Msg: ${errorMessage}`);

      this.$bvToast.toast(msg ,{
        title: title,
        toaster: 'b-toaster-top-right',
        variant: 'danger',
        solid: true,
        appendToast: true
      });
    }
  }
}
</script>

<style>
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
  padding: 0 !important;
  background-color: #f5f5f5;
  overflow: hidden;
}
#app-container {
  display: flex;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}
#app-container.darkmode {
  background-color: #121212;
}
#app {
  flex: 1;
}
#current-view {
  display: block;
  overflow: scroll;
  padding: 30px;
  height: 100%;
  background-color: #fff;
}
</style>
