<template>
    <Splitter
        layout="vertical"
        class="bg-gray-800"
        :pt="{
            gutter: { class: ['bg-gray-900 py-4' ] },
            gutterHandler: { class: ['bg-purple-500 w-2/3']}
        }"
    >
        <SplitterPanel>
            <ProfileSelect />
        </SplitterPanel>
        <SplitterPanel>
            <UserStatSummary></UserStatSummary>
        </SplitterPanel>
    </Splitter>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useSteamUserStore } from '../stores/useSteamUserStore';
import UserStatSummary from '../components/UserStatSummary.vue';
import ProfileSelect from '../components/ProfileSelect.vue';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';

const router = useRouter();
const steamUserStore = useSteamUserStore();
const { activeUsers } = storeToRefs(steamUserStore);

const navigateToDashboard = () => {
    router.push('/dashboard');
};

const hasActiveUsers = computed(() => {
    return activeUsers && activeUsers.value.length > 0;
});
</script>
