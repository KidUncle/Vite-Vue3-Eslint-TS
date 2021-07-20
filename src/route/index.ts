import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/home.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/login.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
