
const generateFantasyGameID = (str) => {
    return parseInt(Math.random()*100000*str.length)
}

module.exports = generateFantasyGameID;