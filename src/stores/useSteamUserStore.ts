import { defineStore } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import * as steamUsersApi from '../api/steamUser.api';
import { normalizeToCamelCase } from '../utils/helper';
import { type UserStats, type SteamUser } from '../ts/SteamUser.types';
import { useGameStore } from './useSteamGameStore';

export const useSteamUserStore = defineStore('steam', () => {
    const possibleUsers = ref<SteamUser[]>([]);
    const selectedUser = ref<SteamUser | null>(null);
    const activeUsers = ref<SteamUser[]>([]);
    const isUserStatLoading = ref<boolean>(false);

    const userStats = ref<UserStats>();

    const gameStore = useGameStore();

    onMounted(() => {
        getActiveUsersFromLocalStorage();
        getSelectedUserFromLocalStorage();
    });

    watch(
        activeUsers,
        (newActiveUsers, oldActiveUsers) => {
            if (
                newActiveUsers.length !== oldActiveUsers.length ||
                JSON.stringify(newActiveUsers) !== JSON.stringify(oldActiveUsers)
            ) {
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

    function getSelectedUserFromLocalStorage() {
        const selectedUserLocalStorage = localStorage.getItem('selectedUser');
        if (selectedUserLocalStorage) {
            // Parse and normalize
            const parsedUser = JSON.parse(selectedUserLocalStorage);
            selectedUser.value = normalizeToCamelCase(parsedUser);
        }
    }

    function setActiveUsersToLocalStorage() {
        localStorage.setItem('activeUsers', JSON.stringify(activeUsers.value));
    }

    function setSelectedUserToLocalStorage() {
        localStorage.setItem('selectedUser', JSON.stringify(selectedUser.value));
    }

    async function searchUser(username: string) {
        try {
            const resp = await steamUsersApi.searchUser(username);
            possibleUsers.value = resp.results || [];
        } catch (error) {
            throw new Error('Unable to search for user. Error: ' + error);
        }
    }

    async function getUserStatsSummary(steamId: string): Promise<UserStats> {
        try {
            isUserStatLoading.value = true;
            const resp = await steamUsersApi.getUserStats(steamId);
            userStats.value = resp;
            return resp;
        } catch (error) {
            throw new Error(error as string);
        } finally {
            isUserStatLoading.value = false;
        }
    }

    function addActiveUser(user: SteamUser) {
        activeUsers.value.push(user);
    }

    function removeActiveUser(user: SteamUser) {
        activeUsers.value = activeUsers.value.filter((u) => u.steamId !== user.steamId);
    }

    async function setSelectedProfile(userSteamId: string): Promise<UserStats> {
        try {
            const resp = await getUserStatsSummary(userSteamId);
            selectedUser.value = resp.profile;
            setSelectedUserToLocalStorage();
            return resp;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    watch(selectedUser, async (newUser, oldUser) => {
        if (newUser) {
            try {
                await getUserStatsSummary(newUser?.steamId);
                await gameStore.getLfd2Stats(newUser?.steamId);
            } catch (error) {
                console.error(
                    'Failed to get User Summary stats for user with id ',
                    newUser.steamId
                );
            }
        }
    });

    return {
        possibleUsers,
        selectedUser,
        activeUsers,
        userStats,
        isUserStatLoading,
        searchUser,
        addActiveUser,
        removeActiveUser,
        getUserStatsSummary,
        setSelectedProfile,
    };
});
