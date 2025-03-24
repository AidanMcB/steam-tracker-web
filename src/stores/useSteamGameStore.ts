// import { defineStore } from "pinia";
// import { computed, ref } from "vue";
// import type { GamePlaytimeData } from "../api/ts/SteamGame.types.api";
// import type { GameInfo } from "../ts/SteamGame.types";
// import httpClient from "../api/httpClient";

// // Interface for the combined game data
// interface CombinedGameInfo {
//     appId: string;
//     name: string;
//     iconUrl?: string;
//     userCount: number;  // How many users own this game
//     totalPlaytime: number; // Total playtime across all users
// }

// export const useSteamGamesStore = defineStore('steamGames', () => {
//     // New refs for game playtime data
//     const gamePlaytimeData = ref<GamePlaytimeData[]>([]);
//     const gamePlaytimeDataByUser = ref<Map<string, GamePlaytimeData>>(new Map()); // Map of userId -> playtime data
//     const gamePlaytimeErrors = ref<Map<string, string>>(new Map()); // Map of userId -> error message
//     const selectedGameId = ref<string | null>(null);
//     const isLoadingPlaytime = ref<boolean>(false);
//     const playtimeError = ref<string | null>(null);

//     // New refs for owned games
//     const ownedGames = ref<Map<string, GameInfo[]>>(new Map()); // Map of steamId -> games
//     const isLoadingGames = ref<boolean>(false);
//     const gamesError = ref<string | null>(null);

//     async function getGamePlaytime(userId: string): Promise<any> {
//         try {
//             const resp = await httpClient.
//         }
//     }


//     // // Computed property for combined games across all users
//     // const combinedGames = computed(() => {
//     //     const gamesMap = new Map<string, CombinedGameInfo>();

//     //     // Process all games from all users
//     //     for (const [userId, games] of ownedGames.value.entries()) {
//     //         for (const game of games) {
//     //             const existing = gamesMap.get(game.appId);

//     //             if (existing) {
//     //                 // Update existing game entry
//     //                 existing.userCount++;
//     //                 existing.totalPlaytime += game.playtimeForever;
//     //             } else {
//     //                 // Create new game entry
//     //                 gamesMap.set(game.appId, {
//     //                     appId: game.appId,
//     //                     name: game.name,
//     //                     iconUrl: game.iconUrl,
//     //                     userCount: 1,
//     //                     totalPlaytime: game.playtimeForever
//     //                 });
//     //             }
//     //         }
//     //     }

//     //     // Convert map to array and sort by number of users, then by total playtime
//     //     return Array.from(gamesMap.values())
//     //         .sort((a, b) => {
//     //             // First sort by how many users own the game
//     //             if (b.userCount !== a.userCount) {
//     //                 return b.userCount - a.userCount;
//     //             }
//     //             // Then by total playtime
//     //             return b.totalPlaytime - a.totalPlaytime;
//     //         });
//     // });

//     // // Get owned games for all active users
//     // async function getOwnedGamesForAllUsers() {
//     //     if (activeUsers.value.length === 0) {
//     //         gamesError.value = 'No active users to fetch games for';
//     //         return;
//     //     }

//     //     isLoadingGames.value = true;
//     //     gamesError.value = null;

//     //     try {
//     //         // Create a new map for the results
//     //         const gamesMap = new Map<string, GameInfo[]>();

//     //         // Fetch games for each user
//     //         const promises = activeUsers.value.map(async user => {
//     //             try {
//     //                 const response = await steamUsersApi.getOwnedGames(user.steamId);
//     //                 // Only store games with some playtime
//     //                 const gamesWithPlaytime = response.games.filter(game => game.playtimeForever > 0);
//     //                 gamesMap.set(user.steamId, gamesWithPlaytime);
//     //                 return { userId: user.steamId, success: true };
//     //             } catch (error) {
//     //                 console.error(`Failed to fetch games for user ${user.personaName}:`, error);
//     //                 return { userId: user.steamId, success: false, error };
//     //             }
//     //         });

//     //         await Promise.all(promises);
//     //         ownedGames.value = gamesMap;

//     //         return combinedGames.value;
//     //     } catch (error) {
//     //         gamesError.value = `Failed to fetch owned games: ${error}`;
//     //         console.error('Error fetching owned games:', error);
//     //         throw error;
//     //     } finally {
//     //         isLoadingGames.value = false;
//     //     }
//     // }

//     // Get playtime data for a specific game across all active users
//     // async function getGamePlaytimeForAllUsers(appId: string) {
//     //     if (!appId) {
//     //         playtimeError.value = 'No game ID provided';
//     //         return;
//     //     }

//     //     if (activeUsers.value.length === 0) {
//     //         playtimeError.value = 'No active users to fetch playtime for';
//     //         return;
//     //     }

//     //     console.log(`Fetching playtime for game ${appId} for ${activeUsers.value.length} users`);

//     //     selectedGameId.value = appId;
//     //     isLoadingPlaytime.value = true;
//     //     playtimeError.value = null;
//     //     gamePlaytimeData.value = [];
//     //     gamePlaytimeDataByUser.value.clear();
//     //     gamePlaytimeErrors.value.clear();

//     //     try {
//     //         // Process each user sequentially for clearer logging and debugging
//     //         for (const user of activeUsers.value) {
//     //             try {
//     //                 console.log(`Fetching playtime for user ${user.personaName} (${user.steamId})`);

//     //                 // Make explicit API call for this user
//     //                 const data = await steamUsersApi.getGamePlaytime(user.steamId, appId);

//     //                 // Add user information to the data
//     //                 const dataWithUser = {
//     //                     ...data,
//     //                     personaName: user.personaName || 'Unknown User'
//     //                 };

//     //                 console.log(`✓ Received playtime data for ${user.personaName}:`, dataWithUser);

//     //                 // Store in the by-user map
//     //                 gamePlaytimeDataByUser.value.set(user.steamId, dataWithUser);

//     //                 // Add to the array of valid results
//     //                 gamePlaytimeData.value.push(dataWithUser);

//     //             } catch (error: any) {
//     //                 console.error(`✗ Error fetching playtime for user ${user.personaName}:`, error);

//     //                 // Store error message for this user
//     //                 const errorMsg = error.message || 'Unknown error fetching playtime data';
//     //                 gamePlaytimeErrors.value.set(user.steamId, errorMsg);

//     //                 // If the error indicates user doesn't own the game, we can create a placeholder
//     //                 if (error.message?.includes('not found in user\'s library')) {
//     //                     gamePlaytimeDataByUser.value.set(user.steamId, {
//     //                         appId,
//     //                         name: 'Game Not Owned',
//     //                         playtimeForever: 0,
//     //                         userId: user.steamId,
//     //                         personaName: user.personaName || 'Unknown User',
//     //                         error: true
//     //                     });
//     //                 }
//     //             }
//     //         }

//     //         console.log(`Loaded playtime data for game ${appId}:`, gamePlaytimeData.value);
//     //         console.log(`Users with errors:`, Array.from(gamePlaytimeErrors.value.entries()));

//     //         return {
//     //             validData: gamePlaytimeData.value,
//     //             byUser: gamePlaytimeDataByUser.value,
//     //             errors: gamePlaytimeErrors.value
//     //         };
//     //     } catch (error) {
//     //         playtimeError.value = `Failed to fetch game playtime: ${error}`;
//     //         console.error('Error in overall playtime fetching process:', error);
//     //         throw error;
//     //     } finally {
//     //         isLoadingPlaytime.value = false;
//     //     }
//     // }




// })