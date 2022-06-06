import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

type IndictorAnalysisRouteRecordRaw = RouteRecordRaw & {
  single?: boolean;
};

const routesConfig: Array<IndictorAnalysisRouteRecordRaw> = [
  {
    path: '/',
    name: '11',
    single: true,
    meta: {},
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          keepAlive: true, // 暂未使用
          label: '指标面板',
          icon: 'HomeFilled',
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/dashboard/index.vue'),
      },
    ],
  },
];

export { IndictorAnalysisRouteRecordRaw, routesConfig };
