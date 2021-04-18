<template>
  <div class="user-settings-container">
    <b-form
      class="user-settings-form"
      @submit.prevent="saveSettings">
      <h2 class="user-settings-header">
        User Settings
      </h2>
      <div class="user-settings-option">
        <label for="edit-username-input">Username:</label>
        <b-input
          id="edit-username-input"
          v-model="form.username"
          required>
        </b-input>
      </div>
      <div class="user-settings-option">
        <b-form-group label="Dark Mode (Not Implemented):">
          <b-form-radio-group
            id="edit-username-dark"
            v-model="form.dark"
            :options="darkOptions"
            buttons
            button-variant="outline-primary"
            required>
          </b-form-radio-group>
        </b-form-group>
      </div>
      <div class="user-settings-toolbar-container">
        <b-button 
          @click="resetSettings"
          :disabled="!dataHasChanged"
          variant="danger">
          Cancel
        </b-button>
        <b-button 
          type="submit"
          :disabled="!dataHasChanged"
          variant="success">
          Save
        </b-button>
      </div>
    </b-form>
  </div>
</template>
<script>
import { auth, firestore } from 'firebase';

export default {
  name: 'UserSettings',
  mounted() {
    if(this.$store.state.isLoggedIn) {
      const query = `users/${auth().currentUser.uid}`;
      this.userSettingsSnapshot = firestore().doc(query).onSnapshot((doc) => {
        this.userSettings = doc.data();
        this.form = Object.assign({}, this.userSettings);
      });
    }
  },
  beforeDestroy(){
    if(this.userSettingsSnapshot) {
      this.userSettingsSnapshot();
    }
  },
  data: function () {
    return {
      userSettingsSnapshot: null,
      userSettings: {},
      form: {},
      darkOptions: [
        { text: 'Dark', value: true },
        { text: 'Light', value: false }
      ]
    }
  },
  computed: {
    dataHasChanged() {
      const userNameChanged = this.userSettings.username != this.form.username;
      const darkModeChanged = this.userSettings.dark != this.form.dark;
      return userNameChanged || darkModeChanged;
    }
  },
  methods: {
    saveSettings() {
      const query = `users/${auth().currentUser.uid}`;
      firestore().doc(query).update(this.form).catch((error) => {
        console.error(`User setting failed to update: ${error}`);
      });
    },
    resetSettings() {
      console.log('Reset settings...');
      this.form = this.userSettings;
    }
  }
}
</script>
<style scoped>
.user-settings-container {
  text-align: left;
}
.user-settings-option {
  margin-bottom: 1.5rem;
}
.user-settings-header {
  text-align: left;
  border-bottom: solid 1px black;
  margin-bottom: 15px;
  padding-bottom: 15px;
}
.user-settings-form {
  margin-left: auto;
  margin-right: auto;
  max-width: 86rem;
}
.user-settings-toolbar-container {
  position: relative;
  display: flex;
  justify-content: flex-end;
}
.user-settings-toolbar-container > button {
  margin-left: 7px;
}
</style>