
const generateFantasyGameID = (str) => {
    return str.split('').reduce((prevHash, currVal) =>
      (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
}

module.exports = generateFantasyGameID;