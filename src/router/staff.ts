import { SettingsOutline } from '@vicons/ionicons5';

export default [
    {
        path: 'staff',
        name: 'Staff',
        component: () => import('@/views/staff/index.vue'),
        meta: { title: 'Staff', icon: SettingsOutline },
    },
];