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
			<div class="form-option-container">
        <b-form-group label="Stay logged in?">
          <b-checkbox
          v-model="form.stayLoggedIn"
          :disabled="loading">
          </b-checkbox>
        </b-form-group>
			</div>
      <b-button class="d-none" type="submit"></b-button>
    </b-form>
  </b-modal>
</template>

<script>
import { auth } from 'firebase';

export default {
  name: 'Login',
  data: function() {
    return {
      form: {
        email: '',
        password: '',
        valid: false,
        stayLoggedIn: false,
      },
      loading: false
    }
  },
  computed: {
    loginBtnTxt() {
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
    resetForm() {
      this.form = {
        email: '',
        password: '',
        valid: false,
        stayLoggedIn: false,
      }
    },
    login() {
      this.loading = true;
      let persist = this.form.stayLoggedIn ? auth.Auth.Persistence.LOCAL : auth.Auth.Persistence.NONE;

      auth().setPersistence(persist).then(() => {
        this.signIn();
      }).catch((error) => {
        this.errorToast(error, 'Login failed');
      });
    },
    signIn() {
      const email = this.form.email;
      const pwd = this.form.password;
      auth().signInWithEmailAndPassword(email, pwd).then(() => {
        this.$nextTick(() => {
          this.$bvModal.hide('login-window');
        });

        this.$bvToast.toast("Login Successful",{
          title: 'Login Status',
          toaster: 'b-toaster-top-right',
          variant: 'success',
          solid: true,
          appendToast: true
        });
      }).catch((error) => {
        this.errorToast(error, 'Login failed');
      }).finally(() => {
        this.loading = false;
      });
    },
    errorToast(error, msg) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(`Error Code: ${errorCode}`);
      console.error(`Error Msg: ${errorMessage}`);

      this.$bvToast.toast(msg ,{
        title: 'Login Error',
        toaster: 'b-toaster-top-right',
        variant: 'danger',
        solid: true,
        appendToast: true
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
