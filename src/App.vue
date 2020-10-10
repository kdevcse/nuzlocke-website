<template>
  <div id="app-container" :class="{darkmode: userSettings.dark}">
    <b-alert 
      dismissible
      variant="info"
      @dismissed="dismissAlert"
      v-show="showAlert">
        {{alertMsg}}
    </b-alert>
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
      <b-nav id="sidebar-nav" vertical class="w-25">
        <h2>Welcome {{userSettings.username}}!</h2>
        <b-nav-item to="/" exact exact-active-class="active">Dashoard</b-nav-item>
        <b-nav-item to="/about" exact exact-active-class="active">About</b-nav-item>
        <b-button id="logout-btn" pill variant="light" @click="logout">Logout</b-button>
      </b-nav>
      <router-view id="current-view"/>
    </div>
    <Login v-else></Login>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue';
import firebase from 'firebase';

export default {
  name: 'Home',
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
    alertMsg() {
      return this.$store.state.alertMsg;
    },
    showAlert() {
      return this.$store.state.alertMsg != null;
    }
  },
  methods: {
    dismissAlert(){
      this.$store.state.alertMsg = null;
    },
    logout() {
      firebase.auth().signOut().then(() => {
        this.$store.commit('set_login_status', false);
        this.$store.commit('set_user_settings', {});
        this.$store.commit('set_runs', []);
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
  background-color: #f5f5f5;
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
  display: flex;
  flex: 1;
}
#sidebar-nav {
  flex: 1;
  background-color: #343a40;
  color: white;
}
#current-view {
  display: block;
  margin: 30px;
  flex: 4;
}
#logout-btn {
  position: relative;
  bottom: 10px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
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
/*#sidebar-nav a.router-link-exact-active {
  color: var(--white)
}*/
</style>
