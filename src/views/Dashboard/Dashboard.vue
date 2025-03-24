<template>
    <div class="p-4 bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 min-h-screen">
        <Card 
            class="shadow-lg"
            :pt="{
                root: { class: 'bg-purple-50 dark:bg-gray-800 rounded-xl overflow-hidden border-none' },
                body: { class: 'bg-purple-50 dark:bg-gray-800' },
                title: { class: 'bg-purple-50 dark:bg-gray-800 border-b border-purple-200 dark:border-purple-800 pb-3' },
                content: { class: 'pt-4' }
            }"
        >
            <template #title>
                <div class="flex justify-between items-center">
                    <span class="text-xl font-semibold text-purple-900 dark:text-purple-300">Steam Dashboard</span>
                    <Button 
                        icon="pi pi-home" 
                        @click="navigateToHome"
                        tooltip="Go back to home"
                        class="rounded-full"
                        :pt="{
                            root: { class: 'text-purple-700 bg-transparent hover:bg-purple-100 border-transparent dark:text-purple-300 dark:hover:bg-gray-800' }
                        }"
                    />
                </div>
            </template>
            <template #content>
                <div class="mb-6">
                    <UserSelect />
                </div>
                
                <!-- Future dashboard content -->
                <div class="bg-purple-100 dark:bg-gray-800 p-4 rounded-md border border-purple-200 dark:border-purple-800">
                    <h3 class="text-lg font-medium mb-2 text-purple-900 dark:text-purple-300">Coming Soon:</h3>
                    <ul class="list-disc pl-5 space-y-1 text-gray-800 dark:text-gray-300">
                        <li>Games owned</li>
                        <li>Hours for each game</li> 
                        <li>Achievements in each game</li>
                    </ul>
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import Button from 'primevue/button';
import UserSelect from './UserSearch.vue';

const router = useRouter();

const navigateToHome = () => {
    router.push('/');
};
</script>

