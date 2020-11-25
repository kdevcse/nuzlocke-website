<template>
  <b-modal
  centered
  size="lg"
  id="login-window"
  title="Login"
	ok-title="Login"
	ok-variant="primary"
  @ok="handleOk"
	@show="handleShow">
    <div id="login-container">
      <div id="login-form-container">
        <b-form ref="form" @submit.stop.prevent="handleSubmit">
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
          <!--<b-button :disabled="loading" block id="loginBtn" variant="primary" type="submit">
            <b-spinner v-if="loading" small type="grow"></b-spinner>
            {{loginBtnTxt}}
          </b-button>-->
        </b-form>
      </div>
    </div>
  </b-modal>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Login',
  data: function() {
    return {
      form: {
        email: '',
        password: '',
        valid: false
      },
      loading: false
    }
  },
  computed: {
    loginBtnTxt(){
      return this.loading ? 'Loading...' : 'Login';
    }
  },
  methods: {
		handleOk(modalWin) {
			modalWin.preventDefault();
			this.handleSubmit();
    },
    handleSubmit(){
      this.login();
    },
		handleShow() {
			this.resetForm();
		},
    resetForm(){
      this.form = {
        email: '',
        password: '',
        valid: false
      }
    },
    login() {
      this.loading = true;
      const email = this.form.email;
      const pwd = this.form.password;
      firebase.auth().signInWithEmailAndPassword(email, pwd).then(() => {
        firebase.firestore().doc(`users/${firebase.auth().currentUser.uid}`).get().then((doc) => {
          this.loading = false;
          this.successfulLogin(doc.data());
        }).catch((error) => {
          this.failedLogin(error, 'There was an error while logging in');
        });
      }).catch((error) => {
        this.failedLogin(error, 'Login failed');
      });
    },
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
        toaster: 'b-toaster-top-right',
        variant: 'danger',
        solid: true,
        appendToast: true
      });
    },
    successfulLogin(data) {
      this.$store.commit('set_login_status', true);
      this.$store.commit('set_user_settings', data);

      this.initFireStore();

      this.$bvToast.toast("Login Successful",{
        title: 'Login Status',
        toaster: 'b-toaster-top-right',
        variant: 'success',
        solid: true,
        appendToast: true
      });

      this.$nextTick(() => {
				this.$bvModal.hide('login-window');
			});
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
