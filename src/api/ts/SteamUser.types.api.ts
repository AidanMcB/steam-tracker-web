import type { GameInfo } from "../../ts/SteamGame.types";
import type { SteamUser, UserStats } from "../../ts/SteamUser.types";

export interface SearchUsersResponse {
    results: SteamUser[];
}

export interface OwnedGamesResponse {
    gameCount: number;
    games: GameInfo[];
}

export type GetUserStatsApiResponse = UserStats