import { createRouter, createWebHashHistory } from 'vue-router';
import dashboardRoutes from './dashboard';
import servicesRoutes from './services';
import customersRoutes from './customers';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [...dashboardRoutes, ...servicesRoutes, ...customersRoutes],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
