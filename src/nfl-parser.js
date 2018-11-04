/*
    nfl-parser takes the raw data obtained by nfl-fetch and parses it 
    into a format using only the data relevant to our Postgres entities.
*/

const NFLFetch = require('./nfl-fetch');
// Cumulative season stats for all players
const fetchResponse = NFLFetch.getPlayerStats();

/*
    @returns {JSONArray} All players and their entity attributes.
    example response:
    [
        {
            "pid": "2552374",
            "firstName": "Ameer",
            "lastName": "Abdullah",
            "position": "RB",
            "team": "DET",
        },
        ...
    ]
*/
async function getPlayers() {
    const playerStats = await fetchResponse;
    return playerStats.players.map(
        player => ({
            "pid": player.id,
            "firstName": player.name.split(' ')[0],
            "lastName": player.name.split(' ')[1],
            "position": player.position,
            "team": player.teamAbbr,
        }))
}

async function getStats() {
    const playerStats = await fetchResponse;
    return playerStats.players.map(
        player => ({
            "gameID": playerStats.season + "W" + playerStats.week, //TODO: game ID? generate in utils?
            "pid": player.id,
        })
    )
}