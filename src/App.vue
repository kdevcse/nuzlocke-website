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
      <b-button v-b-toggle.sidebar-nav>Toggle Sidebar</b-button>
      <b-sidebar id="sidebar-nav"
        bg-variant="dark"
        text-variant="light"
        shadow>
        <h2>Welcome {{userSettings.username}}!</h2>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </b-sidebar>
      <router-view id="current-view"/>
    </div>
    <Login v-else></Login>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

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
#app {
  flex: 1;
}
#app-container.darkmode {
  background-color: #121212;
}
#current-view {
  margin: 30px;
}
/*#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #80ED99;
}
#nav a.router-link-exact-active {
  color: #80ED99;
}*/
</style>
