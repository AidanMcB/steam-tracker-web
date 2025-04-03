<template>
    <div class="card flex justify-center flex-wrap bg-gray-800 rounded-lg">
        <Carousel
            :value="profiles"
            :numVisible="3"
            :numScroll="3"
            :responsiveOptions="responsiveOptions"
            :page="activeProfileIndex"
            :pt="{
                root: { class: ['w-full'] },
                previousbutton: { class: ['text-white text-purple-200'] },
                nextbutton: { class: ['text-white text-purple-200'] },
            }"
        >
            <template #item="slotProps">
                <div
                    @click="setSelectedProfile(slotProps.data)"
                    class="border-2 border-purple-400 dark:border-surface-700 rounded m-2 p-4 flex items-center hover:cursor-pointer active:bg-purple-500"
                    :class="{
                        'bg-purple-700': slotProps.data.name === activeProfile?.name,
                    }"
                >
                    <img
                        :src="slotProps.data.avatarUrl"
                        :alt="slotProps.data.name"
                        class="rounded"
                    />
                    <div class="font-medium text-white text-center w-full">
                        {{ slotProps.data.name }}
                    </div>
                </div>
            </template>
        </Carousel>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useSteamUserStore } from '../stores/useSteamUserStore';
import Carousel from 'primevue/carousel';
import type { UserProfile } from '../ts/SteamUser.types';
import { storeToRefs } from 'pinia';

const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
    },
]);

const steamUserStore = useSteamUserStore();
const { selectedUser } = storeToRefs(steamUserStore);


const activeProfile = computed(() => {
    if (activeProfileIndex.value) {
        return profiles.value[activeProfileIndex.value];
    }
})

const activeProfileIndex = computed(() => {
    return profiles.value.findIndex((profile: UserProfile) => profile.code === selectedUser.value?.steamId)
})

const setSelectedProfile = async (profile: UserProfile) => {
    try {
        await steamUserStore.setSelectedProfile(profile.code);
    } catch (error) {
        console.error(error);
    }
};

// uses avatarmedium from steam api
const profiles = ref<UserProfile[]>([
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
    {
        name: 'reversible frog',
        code: import.meta.env.VITE_REVERSIBLE_FROG_STEAM_ID,
        avatarUrl:
            'https://avatars.steamstatic.com/d0ccc5fb1be823b679809dbf13780791e62b9b98_medium.jpg',
    },
    // {
    //     name: 'Itchycat9800',
    //     code: import.meta.env.VITE_ITCHY_CAT_STEAM_ID,
    //     avatarUrl:
    //         'https://avatars.steamstatic.com/f0d0a2c8389d061926b54b3638aca4ee7de1a50e_medium.jpg',
    // },
]);

</script>
