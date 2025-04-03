import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import * as steamGameApi from '../api/steamGame.api';
import type { GameAchievementsAndInGameStatsV2, GameplayInfoSchem, GameplayStats, InGameStat } from "../ts/SteamGame.types";
import * as gameStats from '../assets/gameData/lfd2/gameStats.json';

export const useGameStore = defineStore('gameStore', () => {
    const lfd2Achievements = ref();
    // const lfd2WeaponStats = ref();
    const lfd2GameStats = ref<GameplayStats[]>();

    const lfd2GameStatsSchema = ref<GameplayInfoSchem>()

    onMounted(() => {
        lfd2GameStatsSchema.value = gameStats
    })

    async function getLfd2Stats(steamId: string): Promise<any> {
        try {
            const resp: GameAchievementsAndInGameStatsV2 = await steamGameApi.getL4d2UserStats(steamId);
            formatLfd2GameStats(resp.playerstats.stats)
            // formatLfd2Achievements(resp.playerstats.achievements);
            return resp;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    // function formatLfd2Achievements(achievements: GameAchievement[]): void {

    // }

    function formatLfd2GameStats(stats: InGameStat[]): void {
        if (!lfd2GameStatsSchema.value) return;
    
        // Create a Map for faster lookups of stats by name
        const statsMap = new Map(
            lfd2GameStatsSchema.value.game.availableGameStats.stats.map((stat) => [stat.name, stat])
        );
        const gameplayStats: GameplayStats[] = [];
    
        // Loop through the API stats and update the values
        stats.forEach((apiStat: InGameStat) => {
            const matchingStat: GameplayStats | undefined = statsMap.get(apiStat.name);
            if (matchingStat) {
                matchingStat.value = apiStat.value; // Update the value directly
                gameplayStats.push({
                    ...matchingStat
                })
            } else {
                // Optionally log if the stat is not found
                console.warn(`Stat not found: ${apiStat.name}`);
            }
        });
        lfd2GameStats.value = [...gameplayStats];
    }

    return {
        lfd2Achievements,
        lfd2GameStats,
        getLfd2Stats
    }
})
