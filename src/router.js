import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: '/films', component: () => import('./views/Films.vue') },
    { path: '/cinemas', component: () => import('./views/Cinemas.vue') },
    { path: '/center', component: () => import('./views/Center.vue') }
  ]
})