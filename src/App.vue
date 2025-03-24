<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import Toast from 'primevue/toast';
</script>

<template>
    <Toast />
    <div
        class="min-h-screen bg-gradient-to-b from-purple-50 to-gray-100 dark:from-gray-900 dark:to-purple-900"
    >
        <Navbar />
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <main>
                <router-view />
            </main>
        </div>
    </div>
</template>

<style>
/* Add any global styles that can't be handled by Tailwind here */
:root {
    /* Making CSS variables from our PrimeVue theme available for Tailwind classes */
    --tw-purple-50: var(--primary-50);
    --tw-purple-100: var(--primary-100);
    --tw-purple-200: var(--primary-200);
    --tw-purple-300: var(--primary-300);
    --tw-purple-400: var(--primary-400);
    --tw-purple-500: var(--primary-500);
    --tw-purple-600: var(--primary-600);
    --tw-purple-700: var(--primary-700);
    --tw-purple-800: var(--primary-800);
    --tw-purple-900: var(--primary-900);
}

/* Make hover effects more pronounced with purple */
.hover\:shadow-md:hover {
    box-shadow:
        0 4px 6px -1px rgba(103, 58, 183, 0.1),
        0 2px 4px -1px rgba(103, 58, 183, 0.06);
}

/* Add a purple tint to card hover effects */
.card:hover {
    border-color: var(--primary-300);
    box-shadow:
        0 4px 6px -1px rgba(103, 58, 183, 0.1),
        0 2px 4px -1px rgba(103, 58, 183, 0.06);
}
</style>
