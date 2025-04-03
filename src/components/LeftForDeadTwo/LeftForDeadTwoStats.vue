<template>
    <template v-if="selectedUser && lfd2GameStats">
        <div class="card h-full">
            <Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]" />
        </div>
    </template>
    <template v-else-if="!selectedUser">
        <h1>No user currently selected. </h1>
        <span>Select a user to see data.</span>
    </template>
    <template v-if='!lfd2GameStats && selectedUser'>
        <p class="text-red-400 p-4 text-center">
            Left For Dead 2 data is not accessible for <span class='text-purple-400'>
                {{ selectedUser.personaName}} 
            </span>.
            <br/>
            To see this user's data, set game data to Public on the user's steam profile.
        </p>
    </template>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useSteamUserStore } from '../../stores/useSteamUserStore';
import { useGameStore } from '../../stores/useSteamGameStore';
import { storeToRefs } from 'pinia';
import type { GameplayStats } from '../../ts/SteamGame.types';

const gameStore = useGameStore();
const { lfd2GameStats } = storeToRefs(gameStore);

const userStore = useSteamUserStore();
const { selectedUser } = storeToRefs(userStore);

onMounted(async () => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
    if (selectedUser.value) {
        try {
            await gameStore.getLfd2Stats(selectedUser.value?.steamId);
        } catch (error) {
            console.error('Failed to get LFD2 stats. Error: ', error)
            // To Do: Display error in UI
        }
    }
});

/*
defaultvalue: 0
displayName: "txt.Stat.GamesPlayed.Total"
displayNameFormatted: "Games Played Total"
name: "Stat.GamesPlayed.Total"
value: 117
*/

const chartData = ref();
const chartOptions = ref();

const displayedStatsFirst = computed(() => {
    return (lfd2GameStats.value?.sort((a: GameplayStats, b: GameplayStats) => a.value - b.value))?.slice(0, 100) as GameplayStats[] || []
})
// const displayedStatsSecond = computed(() => {
//     return (lfd2GameStats.value?.sort((a: GameplayStats, b: GameplayStats) => a.value - b.value))?.slice(100, 200) as GameplayStats[] || []
// })

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: displayedStatsFirst.value.map(stat => stat.displayNameFormatted),
        datasets: [
            {
                label: 'Top 100',
                backgroundColor: documentStyle.getPropertyValue('--purple-500'),
                borderColor: documentStyle.getPropertyValue('--purple-500'),
                data: displayedStatsFirst.value.map(stat => stat.value),
            },
            // {
            //     label: '101 - 200',
            //     backgroundColor: documentStyle.getPropertyValue('--purple-500'),
            //     borderColor: documentStyle.getPropertyValue('--purple-500'),
            //     data: displayedStatsSecond.value.map(stat => stat.value),
            // },
        ],
    };
};
const setChartOptions = () => {

    return {
        indexAxis: 'y',
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'white',
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#fff',
                    font: {
                        weight: 600,
                    },
                },
                grid: {
                    display: false,
                    drawBorder: true,
                },
            },
            y: {
                ticks: {
                    color: '#fffaaa',
                },
                grid: {
                    color: '#9333ea',
                    drawBorder: false,
                },
            },
        },
    };
};
</script>
