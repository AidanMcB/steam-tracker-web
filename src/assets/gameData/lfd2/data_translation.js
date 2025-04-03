
import * as statData from './gameStats.json' assert { type: 'json' };
// const statData = require('gameStats.json');

function formatStatName(statName) {
    // Remove 'Stat.' and replace underscores and periods with spaces
    let formattedName = statName.replace('Stat.', '').replace(/_/g, ' ').replace(/\./g, ' ');

    // Capitalize each word
    formattedName = formattedName
        .split(' ')
        .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');

    return formattedName;
}

function translateNameToFormattedName() {
    let stats = statData.game.availableGameStats;
    let updatedStats = stats.map((stat) => {
        return {
            ...stat,
            displayNameFormatted: formatStatName(stat.name),
        };
    });

    return {
        ...statData,
        game: {
            ...statData.game,
            availableGameStats: [...updatedStats],
        },
    };
}