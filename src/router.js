import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { 
      path: '/films', 
      component: () => import('./views/Films.vue'),
      children: [
        { path: 'nowPlaying', component: () => import('./components/FilmsNowPlaying.vue') },
        { path: 'comingSoon', component: () => import('./components/FilmsComingSoon.vue') },
        { path: '', redirect: '/films/nowPlaying' }
      ],
    },
    { path: '/cinemas', component: () => import('./views/Cinemas.vue') },
    { path: '/center', component: () => import('./views/Center.vue') },
    { path: '/film/:id', name: 'detail', component: () => import('./views/Detail.vue') },
    { path: '*', redirect: '/films/nowPlaying' }
  ]
})