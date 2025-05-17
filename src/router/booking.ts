import { SettingsOutline } from '@vicons/ionicons5';

export default [
    {
        path: 'booking',
        name: 'Booking',
        component: () => import('@/views/booking/index.vue'),
        meta: { title: 'Booking', icon: SettingsOutline },
    },
];