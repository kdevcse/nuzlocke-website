import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import NuzzyRun from '../components/NuzzyRun.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
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
