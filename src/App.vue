<template>
  <div id="app-container" :class="{darkmode: userSettings.dark}">
    <div id="app">
      <Navbar></Navbar>
      <router-view id="current-view"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar
  },
  computed: {
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
  overflow: auto;
  padding: 30px;
  height: 100%;
}
</style>
