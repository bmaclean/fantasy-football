const fetch = require('node-fetch');
const config = require('../config/config.json');

module.exports= {
    getCurrentWeek
}

/*
    @param {String} endpoint
    @returns {JSON} The JSON response of from the provided endpoint. 
*/
async function get(endpoint) {
    const response = await fetch(config.nfl_api.base_url + endpoint)
    const respJSON = await response.json()
    return respJSON;
}

/*
    @returns {JSON} All players, their teams, and stats from this season 
             stored as JSON.
    example response:
    {
        "statType": "seasonStats",
        "season": "2018",
        "week": 9,
        "players": [
            {
                "id": "2552374",
                "name": "Ameer Abdullah",
                "position": "RB",
                "teamAbbr": "DET",
                "stats": {
                    "1": "3"
                }
            }
        ]
    }
*/

function getCurrentWeek() {
    const result = get('/players/stats');
    return result;
}