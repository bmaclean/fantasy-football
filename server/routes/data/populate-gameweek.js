const manager = require('../../src/db-manager.js');

const populateGameweek = async () => {
  const result = await manager.deleteAllTableRows("gameweek");
  console.log(result);

  let numInsertions = 0;

  for (let year=2009; year <= 2018; year++) {
    for (let week=1; week <= 17; week++) {
      const weekId = `${year}W${week}`;
      await manager.insertRow("gameweek", "$1, $2, $3", [weekId, year, week]);
      numInsertions++;
    }
  }

  return numInsertions;
};

module.exports = populateGameweek;
