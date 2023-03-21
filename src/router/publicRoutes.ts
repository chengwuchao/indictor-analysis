import { RouteRecordRaw } from 'vue-router';

const publicRoutes: Array<RouteRecordRaw> = [
  { path: '/login', name: 'login', redirect: '', meta: {}, component: () => import('@/views/login/index.vue') },
];

export default publicRoutes;
