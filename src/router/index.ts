import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'Home - Steam Tracker'
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard/Dashboard.vue'),
        meta: {
            title: 'Dashboard - Steam Tracker'
        }
    },
    // Redirect any unmatched routes to home
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Update document title based on route meta
router.beforeEach((to, from, next) => {
    document.title = to.meta.title as string || 'Steam Tracker';
    next();
});

export default router; 