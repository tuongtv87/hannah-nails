import { HomeOutline } from '@vicons/ionicons5';

export default [
    {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'Dashboard', icon: HomeOutline },
    },
];