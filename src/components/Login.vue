<template>
  <div id="login-container">
    <h1>{{loginMsg}}</h1>
    <div id="login-form-container">
      <b-form v-if="loginReady" @submit="login">
        <b-form-group>
          <b-form-input 
            id="loginEmail"
            type="email"
            v-model="form.email"
            required
            placeholder="Email"
            autocomplete="username"
            :disabled="loading">
          </b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            id="loginPwd"
            type="password"
            v-model="form.password"
            required
            placeholder="Password"
            autocomplete="current-password"
            :disabled="loading"/>
        </b-form-group>
        <b-button :disabled="loading" block id="loginBtn" variant="primary" type="submit">
          <b-spinner v-if="loading" small type="grow"></b-spinner>
          {{loginBtnTxt}}
        </b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Login',
  beforeMount() {
    this.loginReady = true;
  },
  data: function() {
    return {
      loginReady: false,
      form: {
        email: '',
        password: '',
      },
      loading: false,
      loginMsg: 'Login'
    }
  },
  computed: {
    loginBtnTxt(){
      return this.loading ? 'Loading...' : 'Login';
    }
  },
  methods: {
    failedLogin(error, msg){
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(`Error Code: ${errorCode}`);
        console.error(`Error Msg: ${errorMessage}`);

        this.$store.commit('set_login_status', false);
        this.$store.commit('set_user_settings', {});

        this.loading = false;
        this.$bvToast.toast(msg ,{
          title: 'Login Status',
          toaster: 'b-toaster-top-center',
          variant: 'danger',
          solid: true,
          appendToast: true
        });
    },
    login() {
      this.loading = true;
      const email = this.form.email;
      const pwd = this.form.password;
      firebase.auth().signInWithEmailAndPassword(email, pwd).then(() => {
        firebase.firestore().doc(`users/${firebase.auth().currentUser.uid}`).get().then((doc) => {
          this.loginMsg = `Welcome ${this.$store.state.userSettings.username}!`;
          this.loading = false;
          this.loginReady = false;
          
          this.$emit('logged-in', doc.data());
        }).catch((error) => {
          this.failedLogin(error, 'There was an error while logging in');
        });
      }).catch((error) => {
        this.failedLogin(error, 'Login failed');
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login-container {
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
}
#loginBtn {
  margin-top: 20px;
}
#error-txt.error {
  visibility: visible;
}
#error-txt {
  color: red;
  visibility: hidden;
}
</style>
