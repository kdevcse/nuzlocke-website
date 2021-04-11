<template>
  <div class="run-settings-container">
    <b-form 
      @submit="saveSettings">
      <div class="run-settings-toolbar-container">
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
      <div>
        <label for="edit-run-name-input">Run Name:</label>
        <b-input
          id="edit-run-name-input"
          v-model="form.runName"
          required>
        </b-input>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "NuzzyRunSettings",
  props: {
    run: Object,
    runId: String
  },
  data: function() {
    return {
      form: {
        runName: this.run.name
      }
    }
  },
  computed: {
    dataHasChanged() {
      if (!this.form || !this.run) {
        return false;
      }

      console.log(this.form.runName);
      const runNameChanged = this.run.name != this.form.runName;
      return runNameChanged;
    }
  },
  methods: {
    saveSettings() {
      console.log('Saving settings...');
      console.log(this.form);
      console.log(this.run);
    },
    resetSettings() {
      console.log('Reset settings...');
      this.$set(this.form, 'runName', this.run.name);
    }
  }
};
</script>

<style>
.run-settings-container {
  text-align: left;
}
.run-settings-toolbar-container {
  display: flex;
  justify-content: flex-end;
}
.run-settings-toolbar-container > button {
  margin-left: 7px;
}
</style>