import Vue from 'vue'
import VueRouter from 'vue-router'
import MyRuns from '../views/MyRuns.vue'
import News from '../views/News.vue'
import NuzzyRun from '../views/NuzzyRun.vue'
import UserSettings from '../views/UserSettings.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/news',
    redirect: '/'
  },
  {
    path: '/',
    name: 'News',
    component: News
  },
  {
    path: '/myruns',
    name: 'MyRuns',
    component: MyRuns
  },
  {
    path: '/run/:id',
    name: 'Run',
    component: NuzzyRun
  },
  {
    path: '/user/settings',
    name: 'UserSettings',
    component: UserSettings
  }
];

const router = new VueRouter({
  routes
});

export default router;
