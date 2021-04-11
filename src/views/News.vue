<template>
  <div>
    <div>
      <p>News Feed</p>
    </div>
    <b-button
      variant="primary"
      @click="goToMyRuns">
      Click here to view your runs
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'News',
  methods: {
    goToMyRuns() {
      this.$router.push({ name: 'MyRuns' });
    }
  }
}
</script>

<style scoped>

</style>