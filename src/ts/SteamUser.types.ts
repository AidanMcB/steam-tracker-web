import type { PlaytimeSummary, RecentGame } from "./SteamGame.types";

export interface SteamUser {
    steamid: string;
    communityvisibilitystate: number;
    profilestate: number;
    personaname: string;
    profileurl: string;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    avatarhash: string;
    lastlogoff?: number;
    personastate: number;
    primaryclanid?: string;
    timecreated?: number;
    personastateflags?: number;
    loccountrycode?: string;
    locstatecode?: string;
    loccityid?: number;
}

export interface UserStats {
    profile: SteamUser
    playtimeSummary: PlaytimeSummary
    recemtGames: RecentGame[]
}