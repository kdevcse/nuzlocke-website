<template>
  <div id="login-container">
    <h2>Login to Sluglocke</h2>
    <div id="login-form-container">
      <form v-if="loginReady" @submit="login">
        <div>
          <h3>Email</h3>
          <input id="loginEmail" autocomplete="username">
        </div>
        <div>
          <h3>Password</h3>
          <input id="loginPwd" type="password" autocomplete="current-password">
        </div>
        <button id="loginBtn" type="submit">Login</button>
        <p id="error-txt" :class="{error: showError}">{{errorMessage}}</p>
      </form>
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
