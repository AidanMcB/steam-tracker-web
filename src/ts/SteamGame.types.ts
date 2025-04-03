export interface GameInfo {
    appid: string;
    name: string;
    playtimeForever: number;
    imgIconUrl: string;
    imgLogoUrl: string;
    hasCommunityVisibleState?: boolean
    playtime2weeks?: number
    playtimeRecent?: number;
    rtimeLastPlayed?: number
    playtimeHours: number
}

export interface PlaytimeSummary {
    totalGames: number;
    totalPlaytimeHours: number;
    averagePlaytimeHours: number;
    topGames: GameInfo[];
}

export interface RecentGame {
    appid: number
    name: string
    icon_url: string
    logo_url: string
    playime: Playtime
}

interface Playtime {
    totalHours: string
    recentHours: string
}

export interface GameAchievementsAndInGameStatsV2 {
    playerstats: {
        steamID: string,
        gameName: string,
        achievements: GameAchievement[]
        stats: InGameStat[]
    }
}

export interface GameAchievement {
    name: string
    achieved: number // 1 is yes, likely 0 is no?
}

export interface InGameStat {
    name: string // period separated example: Stat.katana.HeadAccuracy.Total
    value: number // count
}

export interface GameplayInfoSchem {
    game: GameplayInfo
}

export interface GameplayInfo {
    gameName: string
    gameVersion: string
    availableGameStats: GameStatsArray
}

interface GameStatsArray {
    stats: GameplayStats[]
}

export interface GameplayStats {
    name: string
    defaultvalue: number
    displayName: string
    displayNameFormatted: string
    value?: any
}

