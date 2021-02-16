<template>
  <div class="run-settings-container">
    <b-form 
      @submit="saveSettings"
      @reset="resetSettings">
      <div class="run-settings-toolbar-container">
        <b-button 
          type="submit"
          variant="success">
          Save
        </b-button>
        <b-button 
          type="reset"
          variant="danger">
          Cancel
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
  methods: {
    saveSettings() {
      console.log('Saving settings...');
      console.log(this.form);
      console.log(this.run);
    },
    resetSettings() {
      console.log('Reset settings...');
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