import { createRouter, createWebHashHistory } from 'vue-router';
import dashboardRoutes from './dashboard';
import servicesRoutes from './services';
import customersRoutes from './customers';
import bookingRoutes from './booking';
import staffRoutes from './staff';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [...dashboardRoutes, ...servicesRoutes, ...customersRoutes, ...bookingRoutes, ...staffRoutes],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
