<template>
  <div class="news-container">
    <div class="timeline-container">
      <h1>News</h1>
      <vue-timeline-update
        class="timeline"
        description="The Inaugural Developer Update"
        category="Update"
        :date="getDate(1618683428309)"
        title="Hello World!"
        theme="light"
        icon="code"
        color="blue"
        is-last>
        Welcome to the Pokemon Run Logger app! (Yikes.. we'll call this a working title)
        This application was designed to provide a way for Pokemon fans to track their
        playthroughs in a sophisticated manner, whether it be a Nuzlocke or a normal playthrough.
        
        <br><br>This app is still in development and will likely have very few users initially.
        I plan to open it up to more users in the future once it has gone trough proper testing.
        So if you have access to use the app consider yourself lucky &#128522; hopefully you enjoy it!

        <br><br>Anyway I will continue to post updates about my progress here to keep you guys 
        updated on any development/news regarding the application.
      </vue-timeline-update>
    </div>
  </div>
</template>

<script>
export default {
  name: 'News',
  methods: {
    goToMyRuns() {
      this.$router.push({ name: 'MyRuns' });
    },
    getDate(milliseconds) {
      return new Date(milliseconds);
    }
  }
}
</script>

<style scoped>
.timeline-container {
  max-width: 86rem;
  margin-left: auto;
  margin-right: auto;
}
.timeline {
  padding: 4px;
}
</style>