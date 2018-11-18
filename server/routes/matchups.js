var express = require('express');
var router = express.Router();
const manager = require('../src/db-manager.js');

const USER_GAMEWEEK_STATS_QUERY = ' SELECT SUM(touchdowns) as TD, SUM(yards) as Y, SUM(catches) as C ' +
'FROM stats as S, playsfor as P WHERE P.username = $1 AND P.pid = S.pid ' +
'AND leaguename = $2 AND S.gameid IN (SELECT gameid FROM nflgame WHERE gameweek = $3)';

const getUserScoreForWeek = async (username, leaguename, gameweek) => {
  const result = await manager.query(USER_GAMEWEEK_STATS_QUERY, [username, leaguename, gameweek]);
  const values = [result.rows[0].td, result.rows[0].y, result.rows[0].c];
  return values.reduce((acc, val) => acc + parseInt(val), 0);
}

router.post('/', async function(req, res, next) {
  const user1 = req.body.username1;
  const user2 = req.body.username2;
  const leaguename = req.body.leaguename;
  const gameweek = req.body.gameweek;

  const user1score = await getUserScoreForWeek(user1, leaguename, gameweek);
  const user2score = await getUserScoreForWeek(user2, leaguename, gameweek);
  
  res.status(200).send({ user1score, user2score });
});

module.exports = router;
