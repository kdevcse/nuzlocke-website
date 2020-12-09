<template>
  <b-modal
  centered
  size="sm"
  id="login-window"
  ok-title="Login"
  ok-variant="primary"
  @ok="handleOk"
  @show="handleShow">
    <template #modal-title>
      <div class="modal-title">
        <h5>Login</h5>
        <b-spinner v-if="loading" variant="primary" small type="grow"></b-spinner>
      </div>
    </template>
    <b-form ref="form" @submit.stop.prevent="login">
			<div class="form-option-container">
				<label for="login-email-input">Email:</label>
				<b-input 
        id="login-email-input" 
        v-model="form.email"
        required
        type="email"
        autocomplete="username"
        :disabled="loading">
				</b-input>
			</div>
			<div class="form-option-container">
				<label for="login-password-input">Password:</label>
				<b-input
        id="login-password-input" 
        v-model="form.password"
        required
        type="password"
        autocomplete="current-password"
        :disabled="loading">
				</b-input>
			</div>
      <b-button class="d-none" type="submit"></b-button>
    </b-form>
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

      this.initOnAuthChange();
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
    },
    initOnAuthChange(){
      firebase.auth().onAuthStateChanged((user) => {
        if(!user) {
          this.$store.commit('set_login_status', false);
          this.$store.commit('set_user_settings', {});
          this.$store.commit('set_runs', []);
        }
      });
    }
  }
}
</script>

<style scoped>
.form-option-container {
	margin: 10px 0px;
}
#error-txt.error {
  visibility: visible;
}
#error-txt {
  color: red;
  visibility: hidden;
}
.modal-title {
  display: flex;
  align-items: center;
}
.modal-title > h5 {
  margin-right: 5px;
}
</style>
