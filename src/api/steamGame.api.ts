import httpClient from './httpClient';
import { handleApiError } from '../utils/helper';
import type { AxiosError } from 'axios';
import type { SearchUsersResponse } from './ts/SteamUser.types.api';
import type { GameAchievementsAndInGameStatsApiV2 } from './ts/SteamGame.types.api';


export async function searchUser(username: string): Promise<SearchUsersResponse> {
    try {
        const resp = await httpClient.get(`/api/steam/search/users?query=${username}`);
        return resp.data;
    } catch (error) {
        console.error('Unable to search for user. Error: ', error);
        throw handleApiError(error as AxiosError)
    }
}

export async function getMultipleUserSummaries(steamIds: string[]): Promise<any> {
    try {
        const resp = await httpClient.get(`/api/steam/users?steamIds=${steamIds.join(',')}`);
        return resp.data;
    } catch (error) {
        console.error('Unable to get multiple user summaries. Error: ', error);
        throw handleApiError(error as AxiosError)
    }
}

export async function getL4d2UserStats(steamId: string): Promise<GameAchievementsAndInGameStatsApiV2> {
    try {
        const resp = await httpClient.get(`/api/steam/game/lfd2/stats/${steamId}`);
        return resp.data;
    } catch (error) {
        console.error(`Unable to get Left for Dead 2 stats for user with steam id ${steamId}. Error: `, error);
        throw handleApiError(error as AxiosError);
    }
}


