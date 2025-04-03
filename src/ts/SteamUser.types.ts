import type { PlaytimeSummary, RecentGame } from "./SteamGame.types";

export interface SteamUser {
    steamId: string;
    communityVisibilityState: number;
    profileState: number;
    personaName: string;
    profileUrl: string;
    avatar: string;
    avatarMedium: string;
    avatarFull: string;
    avatarHash: string;
    lastLogoff?: number;
    personaState: number;
    primaryClanId?: string;
    timeCreated?: number;
    personaStateFlags?: number;
    locCountryCode?: string;
    locStateCode?: string;
    locCityId?: number;
}

export interface UserStats {
    profile: SteamUser
    playtimeSummary: PlaytimeSummary
    recemtGames: RecentGame[]
}

export interface UserProfile {
    name: string
    code: string
    avatarUrl: string
    personaName?: string
}