<template>
    <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 class="text-xl font-bold mb-4 dark:text-white flex items-center">
            <img
                :src="userStats?.profile?.avatarmedium"
                alt="User Avatar"
                class="w-12 h-12 rounded-full"
            />
            <span v-if="userStats" class="text-2xl font-bold text-white text-center ml-4">{{
                userStats.profile.personaname
            }}</span>
        </h2>

        <div v-if="!userStats?.playtimeSummary" class="flex justify-center p-6">
            <i class="pi pi-spin pi-spinner text-3xl"></i>
            <span class="ml-2">Loading your gaming stats...</span>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="p-4 bg-purple-50 dark:bg-gray-700 rounded-lg text-center">
                <h3 class="text-lg font-medium mb-2 dark:text-white">Total Games</h3>
                <p class="text-3xl font-bold text-purple-700 dark:text-purple-300">
                    {{ userStats?.playtimeSummary?.totalGames || 0 }}
                </p>
            </div>

            <div class="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg text-center">
                <h3 class="text-lg font-medium mb-2 dark:text-white">Total Playtime</h3>
                <p class="text-3xl font-bold text-blue-700 dark:text-blue-300">
                    {{ (userStats?.playtimeSummary?.totalPlaytimeHours || 0).toFixed(1) }} hrs
                </p>
            </div>

            <div class="p-4 bg-green-50 dark:bg-gray-700 rounded-lg text-center">
                <h3 class="text-lg font-medium mb-2 dark:text-white">Average Playtime</h3>
                <p class="text-3xl font-bold text-green-700 dark:text-green-300">
                    {{ (userStats?.playtimeSummary?.averagePlaytimeHours || 0).toFixed(1) }} hrs
                </p>
            </div>
        </div>

        <div class="mb-6">
            <h3 class="text-lg font-semibold mb-3 dark:text-white">Your Top Games</h3>
            <div class="card h-[600px]">
                <Chart
                    type="bar"
                    class="h-full text-white"
                    :data="topGamesData"
                    :options="topGamesChartOptions"
                ></Chart>
            </div>
        </div>

        <div v-if="userStats?.playtimeSummary?.topGames?.length" class="mt-6">
            <h3 class="text-lg font-semibold mb-2 dark:text-white">Top Games Details</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                    v-for="game in userStats.playtimeSummary.topGames"
                    :key="game.appid"
                    class="p-3 border rounded-lg hover:shadow-md transition-shadow"
                >
                    <div class="flex items-center">
                        <img
                            v-if="game.imgIconUrl"
                            :src="`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.imgIconUrl}.jpg`"
                            :alt="game.name"
                            class="w-12 h-12 mr-3"
                        />
                        <div>
                            <h4 class="font-medium dark:text-white">{{ game.name }}</h4>
                            <p class="text-sm text-gray-600 dark:text-gray-300">
                                {{ game.playtimeHours.toFixed(1) }} hours played
                            </p>
                            <p
                                v-if="game.playtimeRecent"
                                class="text-xs text-purple-600 dark:text-purple-300"
                            >
                                {{ (game.playtimeRecent / 60).toFixed(1) }} hours in last 2 weeks
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useSteamUserStore } from '../stores/useSteamUserStore';
import { onMounted, ref, watch } from 'vue';
import type { GameInfo } from '../ts/SteamGame.types';
import Chart from 'primevue/chart';

const steamUserStore = useSteamUserStore();

const { userStats } = storeToRefs(steamUserStore);

onMounted(async () => {
    await getUserSummaryData();
    updateChartData();
});

async function getUserSummaryData(): Promise<void> {
    try {
        await steamUserStore.getUserStatsSummary(
            import.meta.env.VITE_DANGER_DUCK_STEAM_ID
        );
    } catch (error) {
        console.error(error);
    }
}

// Watch for changes in userStats and update chart data
watch(
    () => userStats.value?.playtimeSummary?.topGames,
    () => {
        updateChartData();
    },
    { deep: true }
);

const topGamesData = ref();
const topGamesChartOptions = ref();

// Function to update both chart data and options
function updateChartData() {
    topGamesData.value = setTopGamesChartData();
    topGamesChartOptions.value = setTopGamesChartOptions();
}

const setTopGamesChartData = () => {
    // Ensure we have data before processing
    if (!userStats.value?.playtimeSummary?.topGames?.length) {
        return {
            labels: [],
            datasets: [
                {
                    label: 'Playtime Hours',
                    data: [],
                    backgroundColor: [],
                    borderColor: [],
                    borderWidth: 1,
                },
            ],
        };
    }

    // Get the top games data
    const games: GameInfo[] = userStats.value.playtimeSummary.topGames;

    // Colors for the chart
    const backgroundColors = [
        'rgba(249, 115, 22, 0.2)',
        'rgba(6, 182, 212, 0.2)',
        'rgba(107, 114, 128, 0.2)',
        'rgba(139, 92, 246, 0.2)',
        'rgba(236, 72, 153, 0.2)',
        'rgba(34, 197, 94, 0.2)',
        'rgba(59, 130, 246, 0.2)',
        'rgba(234, 179, 8, 0.2)',
    ];

    const borderColors = [
        'rgb(249, 115, 22)',
        'rgb(6, 182, 212)',
        'rgb(107, 114, 128)',
        'rgb(139, 92, 246)',
        'rgb(236, 72, 153)',
        'rgb(34, 197, 94)',
        'rgb(59, 130, 246)',
        'rgb(234, 179, 8)',
    ];

    return {
        labels: games.map((game: GameInfo) => game.name),
        datasets: [
            {
                label: 'Playtime (Hours)',
                // Use playtimeHours directly since it's already in hours
                data: games.map((game: GameInfo) => parseFloat(game.playtimeHours.toFixed(1))),
                backgroundColor: games.map(
                    (_: GameInfo, index: number) =>
                        backgroundColors[index % backgroundColors.length]
                ),
                borderColor: games.map(
                    (_: GameInfo, index: number) => borderColors[index % borderColors.length]
                ),
                borderWidth: 1,
            },
        ],
    };
};

const setTopGamesChartOptions = () => {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    generateLabels: (chart: any) => {
                        let dataset = chart.data.datasets[0]; // Assuming single dataset
                        return chart.data.labels.map((label: string, index: number) => ({
                            text: label,
                            fillStyle: dataset.backgroundColor[index], // Label color matches the bar
                            fontColor: dataset.borderColor[index], // Ensures text color is readable
                            hidden: false,
                        }));
                    },
                },
            },
            title: {
                display: true,
                text: 'Your Top Games by Playtime',
                color: '#FFFFFF',
                font: {
                    size: 16,
                    weight: 'bold',
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return `${parseFloat(context.raw).toFixed(1)} hours played`;
                    },
                },
            },
            colors: {
                enabled: true
            }
        },
        scales: {
            y: {
                ticks: {
                    stepSize: 5,
                },
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Hours Played',
                    color: 'white',
                    font: {
                        weight: 'bold',
                    },
                },
            },
            x: {
                ticks: {
                    color: topGamesData.value.datasets[0].borderColor, // Set X-axis labels to match bars
                    font: {
                        weight: 'bold',
                    },
                },
                title: {
                    display: true,
                    text: 'Games',
                    color: '#FFFFFF',
                    font: {
                        weight: 'bold',
                    },
                },

            },
        },
    };
};
</script>
