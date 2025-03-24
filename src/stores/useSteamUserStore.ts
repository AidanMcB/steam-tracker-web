import { defineStore } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import * as steamUsersApi from '../api/steamUser.api';
import { normalizeToCamelCase } from '../utils/helper';
import { type UserStats, type SteamUser } from '../ts/SteamUser.types';

export const useSteamUserStore = defineStore('steam', () => {
    const possibleUsers = ref<SteamUser[]>([]);
    const selectedUser = ref<SteamUser | null>(null);
    const activeUsers = ref<SteamUser[]>([]);

    const userStats = ref<UserStats>();
    

    onMounted(() => {
        getActiveUsersFromLocalStorage();
    });

    watch(
        activeUsers, 
        (newActiveUsers, oldActiveUsers) => {
            if (newActiveUsers.length !== oldActiveUsers.length ||
                JSON.stringify(newActiveUsers) !== JSON.stringify(oldActiveUsers)) {
                setActiveUsersToLocalStorage();
                
                // When active users change, refresh their owned games
                if (newActiveUsers.length > 0) {
                    // getOwnedGamesForAllUsers();
                }
            }
        },
        { deep: true } 
    );

    function getActiveUsersFromLocalStorage() {
        const activeUsersLocalStorage = localStorage.getItem('activeUsers');
        if (activeUsersLocalStorage) {
            // Parse and normalize
            const parsedUsers = JSON.parse(activeUsersLocalStorage);
            activeUsers.value = normalizeToCamelCase(parsedUsers);
            
            // If we have active users, fetch their games
            if (activeUsers.value.length > 0) {
                // getOwnedGamesForAllUsers();
            }
        }
    }

    function setActiveUsersToLocalStorage() {
        localStorage.setItem('activeUsers', JSON.stringify(activeUsers.value));
    }

    async function searchUser(username: string) {
        try {
            const resp = await steamUsersApi.searchUser(username);
            possibleUsers.value = resp.results || [];
        } catch (error) {
            throw new Error('Unable to search for user. Error: ' + error);
        }
    }

    // Helper function to ensure IDs are strings
    // function normalizeId(id: any): string {
    //     return id?.toString() || '';
    // }

    async function getUserStatsSummary(steamId: string): Promise<UserStats> {
        try {
            const resp = await steamUsersApi.getUserStats(steamId);
            userStats.value = resp;
            return resp;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    // async function getMultipleUserSummaries(steamIds: string[]) {
    //     try {
    //         const resp = await steamUsersApi.getMultipleUserSummaries(steamIds);
            
    //         // Create a Map of existing users by steamId for quick lookup
    //         const existingUsersMap = new Map(
    //             activeUsers.value.map(user => [user.steamId, user])
    //         );
            
    //         // Process the new users from the API response
    //         const newUsers = resp.users || [];
            
    //         // Merge: Keep existing users that aren't in the new request
    //         // and add all the new users
    //         const mergedUsers = [
    //             // Keep existing users that aren't in this new request
    //             ...activeUsers.value.filter(user => 
    //                 !steamIds.includes(normalizeId(user.steamId))
    //             ),
    //             // Add all users from the new response
    //             ...newUsers
    //         ];
            
    //         // Update the store with merged users
    //         activeUsers.value = mergedUsers;
            
    //         return resp;
    //     } catch (error) {
    //         throw new Error('Unable to get multiple user summaries. Error: ' + error);
    //     }
    // }


    function addActiveUser(user: SteamUser) {
        activeUsers.value.push(user);
    }

    function removeActiveUser(user: SteamUser) {
        activeUsers.value = activeUsers.value.filter(u => u.steamid !== user.steamid);
    }


    return { 
        possibleUsers, 
        selectedUser, 
        activeUsers, 
        userStats,
        searchUser, 
        addActiveUser, 
        removeActiveUser,
        getUserStatsSummary
    };
});
