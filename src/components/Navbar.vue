<template>
  <b-navbar
    variant="dark"
    type="dark">
    <b-navbar-nav class="navbar-nav">
      <b-navbar-brand>
        <b-img
          id="slug-brand"
          fluid
          src="@/assets/slug_icon.png"></b-img>
      </b-navbar-brand>
      <b-nav-item
        to="/"
        exact
        exact-active-class="active"
        variant="light">News</b-nav-item>
      <b-nav-item
        to="/MyRuns"
        exact
        exact-active-class="active"
        variant="light">My Runs</b-nav-item>
      <b-nav-item>
        <b-nav-form>
          <b-input-group prepend="@">
            <b-form-input placeholder="Username"></b-form-input>
          </b-input-group>
        </b-nav-form>
      </b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto navbar-nav">
      <Login></Login>
      <b-nav-item-dropdown
        v-if="!isLoggedIn"
        title="Profile"
        variant="link"
        toggle-class="text-decoration-none"
        right
        no-caret>
        <template #button-content>
          <b-icon
            variant="light"
            icon="person-circle"></b-icon>
        </template>
        <b-dropdown-item-button v-b-modal.login-window>
          Login
        </b-dropdown-item-button>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown
        v-else
        title="Profile"
        variant="link"
        toggle-class="text-decoration-none"
        right
        no-caret>
        <template #button-content>
          <b-icon
            variant="light"
            icon="person-circle"></b-icon>
        </template>
        <b-dropdown-item @click="goToUserSettings">
          Settings
        </b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item-button @click="logout">
          Logout
        </b-dropdown-item-button>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>
<script>
import Login from '@/components/Login.vue';
import { auth } from 'firebase';

export default {
  name: 'Navbar',
  components: {
    Login
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    }
  },
  methods: {
    login() {
      this.$router.push({ name: 'Login' });
    },
    logout() {
      auth().signOut().then(() => {
        this.$store.commit('set_login_status', false);
        this.$store.commit('set_user_settings', {});
        this.$store.commit('set_runs', []);
      }).finally(() => {
        this.$router.push({ name: 'News' });
      });
    },
    goToUserSettings() {
      this.$router.push({ name: 'UserSettings' });
    }
  }
}
</script>
<style scoped>
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
.navbar-nav {
  align-items: center;
}
</style>