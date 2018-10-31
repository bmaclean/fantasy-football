const nflFetch = require('./nfl-fetch');
// make request once at start of file:
const NFLData = nflFetch.getCurrentWeek()

// TODO: end promise chain
getPlayer = (pid) => {
    NFLData.then(data => {
        console.log(data)
    })
}