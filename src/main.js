import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import { ToastPlugin, IconsPlugin } from 'bootstrap-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGenderless, faMars, faVenus, faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.config.productionTip = false;

/*Firebase*/
const firebaseConfig = {
  apiKey: "AIzaSyAFlHMEIQtousfpGP82-L7iIycuJSqvK08",
  authDomain: "sluglocke.firebaseapp.com",
  databaseURL: "https://sluglocke.firebaseio.com",
  projectId: "sluglocke",
  storageBucket: "sluglocke.appspot.com",
  messagingSenderId: "712465256094",
  appId: "1:712465256094:web:f208691de80539ad64f58f",
  measurementId: "G-5YJZ9MQ5PX"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

/*Vuex state management*/
Vue.use(Vuex);

/* Bootstrap plugins */
Vue.use(ToastPlugin);
Vue.use(IconsPlugin);

/* Font Awesome */
library.add(faGenderless, faMars, faVenus, faHeartbeat);
Vue.component('font-awesome-icon', FontAwesomeIcon);

const store = new Vuex.Store({
  state: {
    userSettings: {},
    isLoggedIn: false,
    runs: [],
    pokemonInEdit: {}
  },
  mutations: {
    set_user_settings(state, settings){
      state.userSettings = settings;
    },
    set_login_status(state, status){
      state.isLoggedIn = status;
    },
    set_runs(state, userRuns){
      state.runs = userRuns;
    },
    set_pokemonInEdit(state, pokemonObj) {
      state.pokemonInEdit = pokemonObj
    }
  }
});

/*App*/
new Vue({
  router,
  render: h => h(App),
  store: store
}).$mount('#app');
