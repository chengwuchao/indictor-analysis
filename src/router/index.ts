import { createRouter, createWebHashHistory } from 'vue-router';
import { IndictorAnalysisRouteRecordRaw, routesConfig } from './config';
import publicRoutes from './publicRoutes';

const routes: Array<IndictorAnalysisRouteRecordRaw> = [...publicRoutes, ...routesConfig];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
