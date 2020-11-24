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
      <b-navbar variant="dark" type="dark">
        <b-navbar-nav id="sidebar-nav">
          <b-navbar-brand>
            <b-img id="slug-brand" fluid src="@/assets/slug_icon.png"></b-img>
          </b-navbar-brand>
          <b-nav-item to="/" exact exact-active-class="active" variant="light">Dashoard</b-nav-item>
          <b-nav-item to="/about" exact exact-active-class="active">About</b-nav-item>
          <b-nav-item>
            <b-nav-form>
              <b-input-group prepend="@">
                <b-form-input placeholder="Username"></b-form-input>
              </b-input-group>
            </b-nav-form>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown title="Profile" variant="link" toggle-class="text-decoration-none" right no-caret>
            <template #button-content>
              <b-icon variant="light" icon="person-circle"></b-icon>
            </template>
            <b-dropdown-item href="#">Settings</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item-button @click="logout">Logout</b-dropdown-item-button>
          </b-nav-item-dropdown>
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
#current-view {
  display: block;
  overflow: auto;
  padding: 30px;
  height: 100%;
}
.nav-item > a {
  font-weight: bold;
}
#user-txt {
  background-color: var(--primary);
  padding: 5px;
}
#slug-brand {
  height: 35px;
  width: 35px;
  transform: rotateY(-180deg);
}
#sidebar-nav {
  align-items: center;
}
/*#sidebar-nav a.router-link-exact-active {
  color: var(--white)
}*/
</style>
