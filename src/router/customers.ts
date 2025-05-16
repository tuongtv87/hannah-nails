import { SettingsOutline } from '@vicons/ionicons5';

export default [
    {
        path: 'customers',
        name: 'Customers',
        component: () => import('@/views/customers/index.vue'),
        meta: { title: 'Customers', icon: SettingsOutline },
    },
];