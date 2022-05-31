import { createRouter, createWebHashHistory } from 'vue-router';
import { IndictorAnalysisRouteRecordRaw, routesConfig } from './config';

const routes: Array<IndictorAnalysisRouteRecordRaw> = [...routesConfig];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
