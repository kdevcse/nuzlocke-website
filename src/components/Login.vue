<template>
  <div id="login-container">
    <h1>Login</h1>
    <div id="login-form-container">
      <b-form v-if="loginReady" @submit="login">
        <b-form-group>
          <b-form-input 
            id="loginEmail"
            type="email"
            v-model="form.email"
            required
            placeholder="Email"
            autocomplete="username">
          </b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            id="loginPwd"
            type="password"
            v-model="form.password"
            required
            placeholder="Password"
            autocomplete="current-password"/>
        </b-form-group>
        <b-button block id="loginBtn" variant="primary" type="submit">Login</b-button>
        <p id="error-txt" :class="{error: showError}">{{errorMessage}}</p>
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
      errorMessage: 'Login unsuccessful',
      showError: false
    }
  },
  methods: {
    async login(e) {
      const email = this.form.email;
      const pwd = this.form.password;
      console.log(e);
      const loginResult = await firebase.auth().signInWithEmailAndPassword(email, pwd).then(function() {
        console.log('Success!');
        return true;
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(`Error Code: ${errorCode}`);
        console.error(`Error Msg: ${errorMessage}`);
        return false;
      });

      if (loginResult) {
        firebase.firestore().doc(`users/${firebase.auth().currentUser.uid}`).get().then((doc) => {
          this.$store.commit('set_login_status', true);
          this.$store.commit('set_user_settings', doc.data());
          this.$store.commit('set_alert_msg', 'Login successful!');
        });
        this.showError = false;
        this.errorMessage = 'Login successful';
      } else {
        this.showError = true;
        this.errorMessage = 'Login unsuccessful';
        this.$store.commit('set_login_status', false);
        this.$store.commit('set_user_settings', {});
      }
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
