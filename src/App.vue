<template>
  <div id="app-container" :class="{darkmode: userSettings.dark}">
    <div id="app" v-if="isLoggedIn">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
        <p>Welcome {{userSettings.username}}!</p>
      </div>
      <router-view/>
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
  justify-content: center;
  margin: 0 30px;
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
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #80ED99;
}
#nav a.router-link-exact-active {
  color: #80ED99;
}
</style>
