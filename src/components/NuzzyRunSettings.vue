<template>
  <div class="run-settings-container">
    <b-form 
      @submit.prevent="saveSettings">
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
        runName: this.run.runName
      }
    }
  },
  computed: {
    dataHasChanged() {
      if (!this.form || !this.run) {
        return false;
      }

      const runNameChanged = this.run.runName != this.form.runName;
      return runNameChanged;
    }
  },
  methods: {
    saveSettings() {
      this.$emit('saveSettings', this.form);
    },
    resetSettings() {
      this.$set(this.form, 'runName', this.run.runName);
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