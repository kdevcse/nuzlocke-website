<template>
  <div id="login-container">
    <h2>Login to Sluglocke</h2>
    <div id="login-form-container">
      <b-form v-if="loginReady" @submit="login">
        <b-form-group
          label="Email"
          label-for="loginEmail">
          <b-form-input 
            id="loginEmail"
            type="email"
            required
            placeholder="Email">
          </b-form-input>
        </b-form-group>
        <b-form-group
          label="Password"
          label-for="loginPwd">
          <b-form-input
            id="loginPwd"
            type="password"
            required
            placeholder="Password"
            autocomplete="current-password"/>
        </b-form-group>
        <b-button id="loginBtn" variant="primary" type="submit">Login</b-button>
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
      errorMessage: 'Login unsuccessful',
      showError: false
    }
  },
  methods: {
    async login(e) {
      const email = e.target[0].value;
      const pwd = e.target[1].value;
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
  position: absolute;
  top: 30%;
  left: 40%;
}
#login-form-container {
  align-items: center;
  align-self: center;;
  height: 300px;
  width: 400px;
  display: flex;
  justify-content: center;
  box-shadow: 0 5px 10px rgba(154,160,185,.08), 0 15px 40px rgba(166,173,201,.3);
  border-radius: 6px;
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
