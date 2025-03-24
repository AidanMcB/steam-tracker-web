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