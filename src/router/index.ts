import { createRouter, createWebHashHistory } from 'vue-router';
import dashboardRoutes from './dashboard';
import servicesRoutes from './services';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [...dashboardRoutes, ...servicesRoutes],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
