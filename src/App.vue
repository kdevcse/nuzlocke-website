<template>
  <div id="app-container" :class="{darkmode: userSettings.dark}">
    <div id="app" v-if="isLoggedIn">
      <!--Save for mobile -->
      <b-sidebar id="sidebar-nav"
        bg-variant="dark"
        text-variant="light"
        shadow>
        <h2 id="user-txt">Welcome {{userSettings.username}}!</h2>
        <router-link to="/">Dashboard</router-link> |
        <router-link to="/about">About</router-link>
      </b-sidebar>
      <!--End-->
      <b-navbar id="sidebar-nav">
        <b-navbar-nav>
          <b-nav-item to="/" exact exact-active-class="active">Dashoard</b-nav-item>
          <b-nav-item to="/about" exact exact-active-class="active">About</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav title="Logout" class="ml-auto logout-container" @click="logout">
          <b-icon icon="door-open" class="mr-2 logout-default"></b-icon>
          <b-icon icon="door-closed-fill" class="mr-2 logout-hover"></b-icon>
        </b-navbar-nav>
      </b-navbar>
      <router-view id="current-view"/>
    </div>
    <Login v-on:logged-in="login" v-else></Login>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue';
import firebase from 'firebase';

export default {
  name: 'App',
  components: {
    Login
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    userSettings() {
      return this.$store.state.userSettings;
    },
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$store.commit('set_login_status', false);
        this.$store.commit('set_user_settings', {});
        this.$store.commit('set_runs', []);
      });
    },
    login(data) {
      this.$store.commit('set_login_status', true);
      this.$store.commit('set_user_settings', data);

      this.$bvToast.toast("Login Successful",{
        title: 'Login Status',
        toaster: 'b-toaster-top-center',
        variant: 'success',
        solid: true,
        appendToast: true
      });

      this.initFireStore();
    },
    initFireStore(){
      firebase.firestore().collection(`users/${firebase.auth().currentUser.uid}/runs`)
      .onSnapshot((querySnapshot) => {
        let runData = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          data.run_id = doc.id;
          runData.push(data);
        });
        this.$store.commit('set_runs', runData);
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
#sidebar-nav {
  flex: 1;
  background-color: #343a40;
  color: white;
}
#current-view {
  display: block;
  overflow: auto;
  padding: 30px;
  height: 100%;
}
#sidebar-nav a {
  font-weight: bold;
  color: var(--white);
}
#sidebar-nav a:hover{
  background-color: rgba(255, 255, 255, 0.08);
}
#user-txt {
  background-color: var(--primary);
  padding: 5px;
}
.logout-container {
  cursor: pointer;
}
.logout-default, .logout-container:hover > .logout-hover {
  display: block !important;
}
.logout-hover, .logout-container:hover > .logout-default {
  display: none !important;
}
/*#sidebar-nav a.router-link-exact-active {
  color: var(--white)
}*/
</style>
