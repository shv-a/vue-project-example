import MainComponent from '@/components/pages/MainComponent';

export default [
    {
        path: '/',
        name: 'index',
        component: MainComponent,
        meta: {
            requiresAuth: true
        }
    },
]