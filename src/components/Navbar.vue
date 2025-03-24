<template>
    <div class="bg-purple-100 dark:bg-gray-900 border-b border-purple-200 dark:border-purple-800 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <div class="flex items-center space-x-2">
                <img src="../assets/Steam_icon_logo.png" title="Steam Logo" height="12" width="24"/>
                <h1 class="text-lg font-semibold text-purple-900 dark:text-purple-300">Steam Tracker</h1>
            </div>
            <div>
                <Button
                    type="button"
                    icon="pi pi-ellipsis-v"
                    @click="toggle"
                    aria-haspopup="true"
                    aria-controls="overlay_menu"
                    class="rounded-full"
                    :pt="{
                        root: { class: 'text-purple-700 bg-transparent hover:bg-purple-200 border-transparent dark:text-purple-400 dark:hover:bg-gray-800' }
                    }"
                />
                <Menu 
                    ref="menu" 
                    id="overlay_menu" 
                    :model="items" 
                    :popup="true" 
                    :pt="{
                        root: { class: 'bg-white dark:bg-gray-900 border-purple-200 dark:border-purple-800 rounded-lg shadow-lg' },
                        submenu: { class: 'border-b border-purple-100 dark:border-purple-900 pb-2 mb-2' },
                        menuitem: { class: 'rounded-md' },
                        content: { class: 'hover:bg-purple-100 dark:hover:bg-gray-800 rounded-md transition-colors' },
                        icon: { class: 'text-purple-700 dark:text-purple-400' },
                        label: { class: 'text-gray-800 dark:text-gray-300' }
                    }"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const menu = ref();

const toggle = (event: MouseEvent) => {
    menu.value.toggle(event);
};

const items = ref([
    {
        label: 'Navigation',
        items: [
            {
                label: 'Home',
                icon: 'pi pi-home',
                command: () => {
                    router.push('/');
                },
            },
            {
                label: 'Dashboard',
                icon: 'pi pi-chart-bar',
                command: () => {
                    router.push('/dashboard');
                },
            },
        ],
    },
]);
</script>

