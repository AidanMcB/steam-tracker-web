<template>
    <div class="card p-4 bg-purple-50 dark:bg-gray-800 rounded-xl shadow-lg border border-purple-200 dark:border-purple-800">
        <div class="mb-4">
            <h3 class="text-lg font-bold text-purple-900 dark:text-purple-300 mb-2">Left 4 Dead 2 Playtime Comparison</h3>
            
            <div class="flex items-center gap-2 mb-4">
                <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/550/capsule_sm_120.jpg" alt="Left 4 Dead 2" class="w-16 h-auto rounded shadow-sm" />
                <div>
                    <h4 class="font-medium text-gray-800 dark:text-gray-200">Left 4 Dead 2</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Compare who plays the most</p>
                </div>
                
                <Button 
                    @click="loadL4D2Data" 
                    :disabled="isLoading || activeUsers.length === 0"
                    :label="isLoading ? 'Loading...' : 'Refresh Data'"
                    :icon="isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-refresh'"
                    class="ml-auto"
                />
            </div>
            
            <div v-if="errorMessage" class="text-red-600 dark:text-red-400 mb-3">
                {{ errorMessage }}
            </div>
            <div v-if="noDataMessage" class="text-gray-600 dark:text-gray-400 mb-3">
                {{ noDataMessage }}
            </div>
        </div>
        
        <div v-if="isLoading" class="flex justify-center items-center h-64">
            <ProgressSpinner />
        </div>
        
        <div v-else-if="hasL4D2Data" class="chart-container">
            <Chart type="bar" :data="chartData" :options="chartOptions" class="h-64" />
        </div>
        
        <div v-else-if="activeUsers.length === 0" class="flex justify-center items-center h-64">
            <div class="text-center text-gray-600 dark:text-gray-400">
                <p>No users selected. Please select users first.</p>
            </div>
        </div>
        
        <div v-else class="flex flex-col items-center justify-center h-64 gap-3">
            <div class="text-center text-gray-600 dark:text-gray-400">
                <p>No Left 4 Dead 2 playtime data available.</p>
                <p class="text-sm mt-2">Either none of the selected users own the game or playtime data is unavailable.</p>
            </div>
            <Button 
                label="Refresh Data" 
                icon="pi pi-refresh" 
                @click="loadL4D2Data"
                :disabled="isLoading"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useSteamStore } from "../stores/useSteamUserStore";
import { storeToRefs } from "pinia";
import ProgressSpinner from "primevue/progressspinner";
import Button from 'primevue/button';
import type { GamePlaytimeData } from "../api/steamUser.api";

// Left 4 Dead 2 Steam App ID
const L4D2_APP_ID = "550";
const L4D2_NAME = "Left 4 Dead 2";

// Store setup
const steamStore = useSteamStore();
const { 
    activeUsers, 
} = storeToRefs(steamStore);

// Local state
const chartData = ref<any>(null);
const chartOptions = ref<any>(null);
const errorMessage = ref<string | null>(null);
const noDataMessage = ref<string | null>(null);
const l4d2PlaytimeData = ref<GamePlaytimeData[]>([]);
const usersWithoutGame = ref<{userId: string, personaName: string}[]>([]);

// Computed properties
// const isLoading = computed(() => isLoadingPlaytime.value);
const hasL4D2Data = computed(() => l4d2PlaytimeData.value.length > 0);

// Set up chart when component mounts
onMounted(async () => {
    initializeChart();
    
    // If we have active users, automatically load the data
    if (activeUsers.value.length > 0) {
        await loadL4D2Data();
    }
});

// Watch for changes in active users
watch(activeUsers, async (newUsers) => {
    if (newUsers.length > 0) {
        await loadL4D2Data();
    } else {
        // Clear the data if no users selected
        l4d2PlaytimeData.value = [];
        updateChartEmpty();
    }
});

// Watch for changes in playtime data to update chart
watch(gamePlaytimeData, (newData) => {
    if (newData && newData.length > 0) {
        l4d2PlaytimeData.value = [...newData];
        updateChartWithPlaytimeData(newData);
    } else if (newData && newData.length === 0) {
        l4d2PlaytimeData.value = [];
        updateChartEmpty();
        noDataMessage.value = "None of the selected users own Left 4 Dead 2 or have playtime data available.";
    }
});

// Initialize empty chart
const initializeChart = () => {
    chartData.value = {
        labels: [],
        datasets: [{
            label: 'Playtime (hours)',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        }]
    };
    
    chartOptions.value = setChartOptions();
};

// Update chart with empty data
const updateChartEmpty = () => {
    chartData.value = {
        labels: [],
        datasets: [{
            label: `Playtime (hours) - ${L4D2_NAME}`,
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        }]
    };
};

// Load Left 4 Dead 2 playtime data for all active users
const loadL4D2Data = async () => {
    if (activeUsers.value.length === 0) {
        errorMessage.value = "No users selected. Please select users first.";
        return;
    }
    
    errorMessage.value = null;
    noDataMessage.value = null;
    usersWithoutGame.value = [];
    
    try {
        console.log('Loading L4D2 data for users:', activeUsers.value);
        const result = await steamStore.getGamePlaytimeForAllUsers(L4D2_APP_ID);
        
        if (gamePlaytimeData.value.length === 0) {
            noDataMessage.value = "None of the selected users own Left 4 Dead 2 or have playtime data available.";
            
            // Check who doesn't own the game
            for (const user of activeUsers.value) {
                const error = gamePlaytimeErrors.value.get(user.steamId);
                if (error && error.includes('not found in user\'s library')) {
                    usersWithoutGame.value.push({
                        userId: user.steamId,
                        personaName: user.personaName
                    });
                }
            }
            
            if (usersWithoutGame.value.length > 0) {
                noDataMessage.value += ` Users without this game: ${usersWithoutGame.value.map(u => u.personaName).join(', ')}`;
            }
        } else {
            console.log('Received playtime data:', gamePlaytimeData.value);
            
            // Check if any users don't own the game but others do
            for (const user of activeUsers.value) {
                const userData = gamePlaytimeDataByUser.value.get(user.steamId);
                if (!userData || userData.error) {
                    usersWithoutGame.value.push({
                        userId: user.steamId,
                        personaName: user.personaName
                    });
                }
            }
        }
    } catch (error: any) {
        console.error('Error in loadL4D2Data:', error);
        errorMessage.value = `Error loading Left 4 Dead 2 data: ${error.message || error}`;
        if (error.response) {
            console.error('API Response error:', error.response.data);
            errorMessage.value += ` (Status: ${error.response.status})`;
        }
    }
};

// Update chart with playtime data
const updateChartWithPlaytimeData = (data: GamePlaytimeData[]) => {
    // Generate colors based on number of users
    const colorPalette = generateColorPalette(data.length);
    
    // Sort data by playtime (most to least)
    const sortedData = [...data].sort((a, b) => b.playtimeForever - a.playtimeForever);
    
    // Add debug logs to see the playtime data
    console.log('L4D2 Playtime Data:', sortedData);
    
    // Update chart data
    chartData.value = {
        // Labels are user names
        labels: sortedData.map(item => item.personaName),
        datasets: [{
            label: `Playtime (hours) - ${L4D2_NAME}`,
            // Convert minutes to hours and round to 1 decimal
            data: sortedData.map(item => (item.playtimeForever / 60).toFixed(1)),
            backgroundColor: colorPalette.map(color => `rgba(${color}, 0.2)`),
            borderColor: colorPalette.map(color => `rgb(${color})`),
            borderWidth: 1
        }]
    };
    
    // Add additional message if some users don't own the game
    if (usersWithoutGame.value.length > 0) {
        noDataMessage.value = `Some users don't own this game: ${usersWithoutGame.value.map(u => u.personaName).join(', ')}`;
    }
};

// Generate color palette for chart
const generateColorPalette = (count: number) => {
    const baseColors = [
        '239, 68, 68',    // Red (L4D2 theme color)
        '249, 115, 22',   // Orange
        '234, 179, 8',    // Yellow
        '34, 197, 94',    // Green
        '6, 182, 212',    // Cyan
        '59, 130, 246',   // Blue
        '139, 92, 246',   // Purple
        '236, 72, 153',   // Pink
        '168, 85, 247',   // Indigo
        '20, 184, 166'    // Teal
    ];
    
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(baseColors[i % baseColors.length]);
    }
    
    return colors;
};

// Set chart options with L4D2 theming
const setChartOptions = () => {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#374151', // gray-700
                    font: {
                        weight: 'bold' 
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        return `${context.dataset.label}: ${context.raw} hours`;
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#6B7280', // gray-500
                    font: {
                        weight: 'bold'
                    }
                },
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#6B7280', // gray-500
                    callback: function(value: any) {
                        return value + ' hrs';
                    }
                },
                grid: {
                    color: 'rgba(203, 213, 225, 0.3)' // slate-200 with opacity
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false
    };
};
</script>

<style scoped>
.card {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
}

.chart-container {
    min-height: 300px;
}
</style>
