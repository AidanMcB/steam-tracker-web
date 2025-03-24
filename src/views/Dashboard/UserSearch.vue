<template>
    <!-- Search via username to find your user, select your user and assign it to local storage -->
    <div
        class="flex flex-wrap justify-center items-end gap-4 p-5 rounded-lg bg-white border border-purple-200 shadow-sm dark:bg-gray-800 dark:border-purple-800"
    >
        <div class="w-full md:w-96 py-2">
            <FloatLabel>
                <InputText
                    id="username"
                    v-model="userSearchText"
                    class="w-full p-0.5"
                    :pt="{
                        root: {
                            class: 'bg-white dark:bg-gray-800 border-purple-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-200 dark:border-purple-900 dark:text-gray-200',
                        },
                    }"
                />
                <label
                    for="username"
                    :pt="{
                        root: { class: 'text-gray-600 dark:text-gray-400' },
                    }"
                >
                    Steam Username
                </label>
            </FloatLabel>
            <p class="text-xs text-gray-600 dark:text-gray-300 mt-2">
                Enter your Steam username to search
            </p>
            <div class="mt-4 flex justify-end">
                <Button
                    icon="pi pi-search"
                    label="Search"
                    class="text-white p-2 text-sm"
                    @click="handleSearch"
                    :pt="{
                        root: {
                            class: 'bg-purple-700 hover:bg-purple-800 border-purple-700 hover:border-purple-800 dark:bg-purple-700 dark:hover:bg-purple-600 dark:border-purple-700 dark:hover:border-purple-600',
                        },
                    }"
                />
            </div>
        </div>

        <!-- Search Results -->
        <div v-if="possibleUsers.length > 0" class="w-full mt-4">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Search Results</h3>
            <div class="grid grid-cols-1 gap-3">
                <div 
                    v-for="user in possibleUsers" 
                    :key="user.steamId"
                    class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 cursor-pointer transition-colors"
                    @click="selectUser(user)"
                >
                    <img :src="user.avatarUrl" :alt="user.personaName" class="w-10 h-10 rounded-full mr-3" />
                    <div>
                        <p class="font-medium text-gray-900 dark:text-gray-100">{{ user.personaName }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Steam ID: {{ user.steamId }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import { useSteamStore } from '../../stores/useSteamUserStore';
import { storeToRefs } from 'pinia';

const userSearchText = ref<string>('');
const steamStore = useSteamStore(); 
const { possibleUsers } = storeToRefs(steamStore);
const toast = useToast();

// Search handler for button click
const handleSearch = async () => {
    if (!userSearchText.value.trim()) {
        toast.add({ severity: 'warn', summary: 'Empty Search', detail: 'Please enter a username to search', life: 3000 });
        return;
    }
    
    try {
        console.log('Searching for:', userSearchText.value);
        await steamStore.searchUser(userSearchText.value);
        
        if (possibleUsers.value.length === 0) {
            toast.add({ severity: 'info', summary: 'No users found', detail: 'Try a different username', life: 3000 });
        }
    } catch (error) {
        console.error('Unable to search for user. Error: ', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to search for users', life: 3000 });
    }
};

// Select a user from search results
const selectUser = (user: any) => {
    steamStore.selectedUser = user;
    toast.add({ 
        severity: 'success', 
        summary: 'User Selected', 
        detail: `Selected ${user.personaName}`, 
        life: 3000 
    });
    // Store the selected user in localStorage for persistence
    localStorage.setItem('selectedSteamUser', JSON.stringify(user));
};
</script>

<style scoped>
.p-float-label input:focus ~ label {
    color: var(--purple-300);
}
</style>
