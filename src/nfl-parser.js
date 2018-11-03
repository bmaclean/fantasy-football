const NFLFetch = require('./nfl-fetch');
const fetchResponse = NFLFetch.getPlayerStats();

async function getPlayers() {
    const playerStats = await fetchResponse;
    console.log(playerStats.players.map(
        player => ({
            "pid": player.id,
            "firstName": player.name.split(' ')[0],
            "lastName": player.name.split(' ')[1],
            "position": player.position,
            "team": player.teamAbbr,
        })))
}

getPlayers()