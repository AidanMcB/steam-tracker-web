<template>
    <template v-if="selectedUser">
        <div class="card h-full">
            <Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]" />
        </div>
    </template>
    <template v-else>
        <h1>No user currently selected. </h1>
        <span>Select a user to see data.</span>
    </template>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSteamUserStore } from '../../stores/useSteamUserStore';
import { useGameStore } from '../../stores/useSteamGameStore';
import { storeToRefs } from 'pinia';
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
            console.log('Game Stats: ', lfd2GameStats.value)
        } catch (error) {
            console.log('Failed to get LFD2 stats. Error: ', error)
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

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: lfd2GameStats.value?.map(stat => stat.displayNameFormatted),
        datasets: [
            {
                label: 'Usage',
                backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                data: lfd2GameStats.value?.map(stat => stat.value),
            },
            // {
            //     label: 'My Second dataset',
            //     backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
            //     borderColor: documentStyle.getPropertyValue('--p-gray-500'),
            //     data: [lfd2GameStats.value?.map(stat => stat.value)],
            // },
        ],
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        indexAxis: 'y',
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: textColor,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500,
                    },
                },
                grid: {
                    display: false,
                    drawBorder: false,
                },
            },
            y: {
                ticks: {
                    color: textColorSecondary,
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false,
                },
            },
        },
    };
};
</script>
