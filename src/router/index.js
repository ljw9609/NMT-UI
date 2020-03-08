import Vue from 'vue';
import VueRouter from 'vue-router';
import Translate from '@/views/Translate.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Translate,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/translate',
    name: 'Translate',
    component: Translate,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
