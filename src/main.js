import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Red from './components/pages/red-tasks'
import Orange from './components/pages/orange-tasks'
import Yellow from './components/pages/yellow-tasks'
import Urgent from './components/pages/urgent-tasks'
import All from './components/pages/active-tasks'
import Trash from './components/pages/deleted-tasks'
import {store} from './store'

Vue.use(VueRouter);

const routes = [{
    path: '/',
    component: All
  },
  {
    path: '/red',
    component: Red
  },
  {
    path: '/orange',
    component: Orange
  },
  {
    path: '/yellow',
    component: Yellow
  },
  {
    path: '/urgent',
    component: Urgent
  },
  {
    path: '/trash',
    component: Trash
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
});

export const eventBus = new Vue();

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
