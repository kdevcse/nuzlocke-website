<template>
  <div class="home">
    <div id="runs-container">
      <div v-for="run in runs" v-bind:key="run.run_id" class="run-container">
        <h3>{{run.name}}</h3>
        <h4>Version: {{run.version}}</h4>
        <h4>Badges: {{run.badges}}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Home',
  components: {
  },
  mounted(){
    firebase.firestore().collection('runs')
    .where('guid', '==', firebase.auth().currentUser.uid)
    .get().then((result) => {
      this.runs = result.docs.map(doc => doc.data());
    });
  },
  data: function() {
    return {
      runs: []
    }
  }
}
</script>
<style scoped>
#runs-container {
  padding: 0px 30px;
}
.run-container {
  text-align: left;
  padding: 10px;
  border: 1px solid slategrey;
  border-radius: 6px;
}
.run-container:hover {
  cursor: pointer;
  background-color: rgba(112, 128, 144, 0.452);
}
</style>