import { RouteRecordRaw } from 'vue-router';

const publicRoutes: Array<RouteRecordRaw> = [
  { path: '/login', name: 'login', redirect: '', meta: {}, component: () => import('@/views/login/index.vue') },

  { path: '/403', name: '403', redirect: '', meta: {}, component: () => import('@/views/exception/403/Index.vue') }
];

export default publicRoutes;
