import type { GameAchievementsAndInGameStatsV2 } from "../../ts/SteamGame.types";

export interface GamePlaytimeData {
    appId: string;
    name: string;
    playtimeForever: number; // total minutes played
    playtimeRecent?: number; // minutes played in last 2 weeks
    userId: string;          // to track which user this belongs to
    personaName: string;     // user's display name
    error?: boolean;         // flag for error state
    lastPlayed?: number;     // last played date
}

export type GameAchievementsAndInGameStatsApiV2 = GameAchievementsAndInGameStatsV2

