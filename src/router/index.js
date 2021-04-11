import Vue from 'vue'
import VueRouter from 'vue-router'
import MyRuns from '../views/MyRuns.vue'
import NuzzyRun from '../components/NuzzyRun.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'MyRuns',
    component: MyRuns
  },
  {
    path: '/run/:id',
    name: 'Run',
    component: NuzzyRun
  }
];

const router = new VueRouter({
  routes
});

export default router;
