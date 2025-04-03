<template>
    <Splitter
        layout="vertical"
        class="bg-gray-800"
        :pt="{
            gutter: { class: ['bg-gray-900 py-4'] },
            gutterHandler: { class: ['bg-purple-500 w-2/3'] },
        }"
    >
        <SplitterPanel>
            <ProfileSelect />
        </SplitterPanel>
        <SplitterPanel :pt="{ root: ['pt-4']}">
            <SelectButton
                v-model="activeView"
                :options="viewOptions"
                aria-labelledby="basic"
                :pt="{
                    root: { class: ['flex justify-center my-2'] },
                }"
            />
            <template v-if="userSummaryView">
                <UserStatSummary></UserStatSummary>
            </template>
            <template v-if="l4d2View">
                <LeftForDeadTwoSummary></LeftForDeadTwoSummary>
            </template>
        </SplitterPanel>
    </Splitter>
</template>

<script setup lang="ts">
import UserStatSummary from '../components/UserStatSummary.vue';
import ProfileSelect from '../components/ProfileSelect.vue';
import LeftForDeadTwoSummary from '../components/LeftForDeadTwo/LeftForDeadTwoSummary.vue';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import { computed, ref } from 'vue';

const activeView = ref('User Summary');
const viewOptions = ref(['User Summary', 'L4D 2']);

const userSummaryView = computed(() => {
    return activeView.value === 'User Summary';
});

const l4d2View = computed(() => {
    return activeView.value === 'L4D 2';
});
</script>

<style>
.p-selectbutton .p-button:not(.p-highlight) {
    color: #888;
}
</style>
