<template>
    <div class="card flex justify-center flex-wrap bg-gray-800 rounded-lg">
        <span class="text-white mt-4">Select a gamer</span>
        <Listbox
            v-model="selectedProfile"
            :options="profiles"
            multiple
            optionLabel="name"
            optionGroupLabel="label"
            optionGroupChildren="items"
            class="w-full md:w-56 my-2 dark:bg-gray-800 rounded-lg shadow"
            :pt="{
                root: {
                    class: ['ark:bg-gray-800 rounded-lg'],
                },
                itemgroup: {
                    class: '!text-white p-0',
                },
            }"
        >
            <template #optiongroup="slotProps">
                <div
                    @click="setSelectedProfile(slotProps.option)"
                    class="flex items-center dark:bg-gray-700 shadow hover:bg-gray-600 hover:cursor-pointer my-2"
                    :class="{
                        '!bg-purple-500': slotProps.option.name === selectedProfile?.name,
                    }"
                >
                    <img
                        :alt="slotProps.option.name"
                        :src="slotProps.option.avatarUrl"
                        style="width: 42px"
                    />
                    <div class="ml-2">{{ slotProps.option.name }}</div>
                </div>
            </template>
        </Listbox>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useSteamUserStore } from '../stores/useSteamUserStore';

const steamUserStore = useSteamUserStore();

const selectedProfile = ref({
    name: 'DangerDuck',
    code: import.meta.env.VITE_DANGER_DUCK_STEAM_ID,
    avatarUrl:
        'https://avatars.steamstatic.com/2efcc523af3dc561179833e0dd2520c91b96b1ee_medium.jpg',
});

const setSelectedProfile = async (profile: any) => {
    console.log('profile option: ', profile);
    selectedProfile.value = profile;
    try {
        await steamUserStore.getUserStatsSummary(profile.code);
    } catch (error) {
        console.error(error);
    }
};

// uses avatarmedium from steam api
const profiles = ref([
    {
        name: 'Agent Weasroy',
        code: import.meta.env.VITE_WEASROY_STEAM_ID,
        avatarUrl:
            'https://avatars.steamstatic.com/f03caba5b7c73c83c037f151911229fcce2cc54e_medium.jpg',
    },
    // { name: 'Armed Angus', code: import.meta.env.VITE_ARMED_ANGUS_STEAM_ID, avatarUrl: ''},
    {
        name: 'DangerDuck',
        code: import.meta.env.VITE_DANGER_DUCK_STEAM_ID,
        avatarUrl:
            'https://avatars.steamstatic.com/2efcc523af3dc561179833e0dd2520c91b96b1ee_medium.jpg',
    },
    {
        name: 'Hacker Man',
        code: import.meta.env.VITE_HACKER_MAN_STEAM_ID,
        avatarUrl:
            'https://avatars.steamstatic.com/15c102489bf707b4a137cad99785b866959a4d07_medium.jpg',
    },
    {
        name: 'Sentimental Poopflap',
        code: import.meta.env.VITE_POOPFLAP_STEAM_ID,
        avatarUrl:
            'https://avatars.steamstatic.com/df02d2ddb9a28b44b2c7fa483bea99c53913d50b_medium.jpg',
    },
    {
        name: 'Schlub MaKonky',
        code: import.meta.env.VITE_SCHLUB_STEAM_ID,
        avatarUrl:
            'https://avatars.steamstatic.com/f0d0a2c8389d061926b54b3638aca4ee7de1a50e_medium.jpg',
    },
    // {
    //     name: 'Itchycat9800',
    //     code: import.meta.env.VITE_ITCHY_CAT_STEAM_ID,
    //     avatarUrl:
    //         'https://avatars.steamstatic.com/f0d0a2c8389d061926b54b3638aca4ee7de1a50e_medium.jpg',
    // },
]);
</script>
