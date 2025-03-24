<template>
    <div
        class="user-select-card bg-purple-50 dark:bg-gray-800 rounded-xl shadow-lg border border-purple-200 dark:border-purple-800 p-4 mb-4 flex flex-wrap"
    >
        <div class="flex flex-col gap-4">
            <h3
                class="text-lg font-bold text-purple-900 dark:text-purple-300 mb-2 border-b border-purple-200 dark:border-purple-800 pb-3"
            >
                Select Steam Users
            </h3>
            <div class="space-y-3">
                <div
                    v-for="user of steamUsers"
                    :key="user.steamId"
                    class="flex items-center gap-3 p-2 hover:bg-purple-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                    <Checkbox
                        v-model="selectedUsers"
                        :inputId="user.steamId"
                        name="steamUser"
                        :value="user.steamId"
                    />
                    <label
                        :for="user.steamId"
                        class="text-gray-800 dark:text-gray-300 cursor-pointer"
                        >{{ user.name }}</label
                    >
                </div>
            </div>
        </div>
        <Button @click="getUserData"
        class="p-2 ml-auto"
            label="Get User Data"
            :disabled="isButtonDisabled"
        />  
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import steamUsers from '../ts/constants';
import { useSteamUserStore } from '../stores/useSteamUserStore';

const steamStore = useSteamUserStore();
const { activeUsers } = storeToRefs(steamStore);
const selectedUsers = ref<string[]>([]);

const normalizeId = (id: any): string => {
    return id?.toString() || '';
};

const activeUserIds = computed(() => {
    return activeUsers.value && activeUsers.value.length > 0
        ? activeUsers.value.map(user => normalizeId(user.steamid))
        : [];
});

onMounted(() => {
    updateSelectedFromActive();
});

function updateSelectedFromActive() {
    const ids = activeUserIds.value;
    selectedUsers.value = [...ids];
}

const getUserData = () => {
    const existingIds = activeUserIds.value;
    const currentSelection = selectedUsers.value;
    
    steamStore.getMultipleUserSummaries(currentSelection)
        .then(response => {
            // After the API call, we need to ensure existing selected users that weren't 
            // in the current API call are still preserved
            console.log('API response received:', response);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
};

watch(
    activeUserIds,
    (newIds) => {
        if (newIds.length > 0 && selectedUsers.value.length === 0) {
            updateSelectedFromActive();
        }
    },
    { immediate: true }
);

watch(
    selectedUsers,
    (newVal) => {
        console.log('selectedUsers changed to:', newVal);
    }
);

const isButtonDisabled = computed(() => {
    return selectedUsers.value.length === 0;
});
</script>

<style scoped>
.user-select-card {
    width: 100%;
    max-width: 350px;
    transition: all 0.3s ease;
}

.user-select-card:hover {
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

:deep(.p-checkbox .p-checkbox-box.p-highlight) {
    background-color: var(--purple-700);
    border-color: var(--purple-700);
}

:deep(.p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-highlight:hover) {
    background-color: var(--purple-800);
    border-color: var(--purple-800);
}

:deep(.p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box:hover) {
    border-color: var(--purple-500);
}

/* Focus state */
:deep(.p-checkbox:not(.p-checkbox-disabled).p-focus .p-checkbox-box) {
    box-shadow: 0 0 0 0.2rem var(--purple-300);
    border-color: var(--purple-500);
}
</style>
