import { SettingsOutline } from '@vicons/ionicons5';

export default [
    {
        path: 'services',
        name: 'Services',
        component: () => import('@/views/services/index.vue'),
        meta: { title: 'Services', icon: SettingsOutline },
    },
];