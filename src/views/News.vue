<template>
  <div class="news-container">
    <div class="timeline-container">
      <h2 class="news-header">
        News
      </h2>
      <vue-timeline-update
        v-for="(n, index) in news"
        :key="index"
        class="timeline"
        :description="n.description"
        :category="n.category"
        :date="getDate(n.date)"
        :title="n.title"
        theme="light"
        :icon="getIcon(n.category)"
        :color="getColor(n.category)"
        :is-last="isLastNews(index)">
        <span v-html="n.html"></span>
      </vue-timeline-update>
    </div>
  </div>
</template>

<script>
import { firestore } from 'firebase';
//Timeline docs: https://www.growthbunker.dev/vuetimeline/?ref=madewithvuejs.com
export default {
  name: 'News',
  mounted() {
    firestore().collection('news').get().then((data) => {
      var newsObjects = [];
      data.docs.forEach((doc) => {
        newsObjects.push(doc.data());
      });

      this.news = newsObjects;
    })
  },
  computed: {
    sortedNews() {
      return this.news.slice().sort(function (a, b) { return a.date - b.date });
    }
  },
  data: function() {
    return {
      news: []
    }
  },
  methods: {
    goToMyRuns() {
      this.$router.push({ name: 'MyRuns' });
    },
    getDate(milliseconds) {
      return new Date(milliseconds);
    },
    getIcon(cateogry) {
      switch(cateogry) {
      case "update":
        return "code";
      default:
        return "code";
      }
    },
    getColor(cateogry) {
      switch(cateogry) {
      case "update":
        return "blue";
      default:
        return "blue";
      }
    },
    isLastNews(index){
      return index === this.sortedNews.length - 1;
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
.news-header {
  text-align: left;
  border-bottom: solid 1px black;
  margin-left: 160px;
  margin-bottom: 15px;
  padding-bottom: 15px;
}
</style>