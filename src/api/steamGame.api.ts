import httpClient from './httpClient';
import { handleApiError } from '../utils/helper';
import type { AxiosError } from 'axios';
import type { GameInfo } from '../ts/SteamGame.types';
import type { SearchUsersResponse } from './ts/SteamUser.types.api';


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


