var express = require('express');
var router = express.Router();
const manager = require('../src/db-manager.js');
const generateFantasyGameID = require('../utils/fantasy-id.js');

const USER_GAMEWEEK_STATS_QUERY = ' SELECT SUM(touchdowns) as TD, SUM(yards) as Y, SUM(catches) as C ' +
'FROM stats as S, playsfor as P WHERE P.username = $1 AND P.pid = S.pid ' +
'AND leaguename = $2 AND S.gameid IN (SELECT gameid FROM nflgame WHERE gameweek = $3)';

const INSERT_NEW_MATCHUP_QUERY = 'INSERT INTO fantasygame(fantasygameid, user1, user2,' +
  'gameweek, user1score, user2score, leaguename) VALUES ($1, $2, $3, $4, $5, $6, $7)';

const GET_MATCHUP_FROM_WEEK = 'SELECT user1, user1score, user2, user2score FROM fantasygame FG, gameweek G ' +
  'WHERE FG.leaguename = $1 AND (user1 = $2 OR user2 = $2) AND (user2 = $3 OR user1 = $3) AND FG.gameweek = G.weekid ' +
  'AND G.gameyear = $4 AND G.gameweek = $5';

const getUserScoreForWeek = async (username, leaguename, gameweek) => {
  const result = await manager.query(USER_GAMEWEEK_STATS_QUERY, [username, leaguename, gameweek]);
  const values = [result.rows[0].td, result.rows[0].y, result.rows[0].c];
  return values.reduce((acc, val) => acc + parseInt(val), 0);
}

router.post('/', async function(req, res, next) {
  const user1 = req.body.user1;
  const user2 = req.body.user2;
  const leaguename = req.body.leaguename;
  const gameyear = req.body.gameyear;
  const gameweek = req.body.gameweek;

  const result = await manager.query(GET_MATCHUP_FROM_WEEK, [leaguename, user1, user2, gameyear, gameweek]);
  console.log(result);

  res.status(200).send(result.rows);
});

// TODO: need all GameWeeks inserted (FK constraint)
router.post('/new', async function(req, res) {
  const {user1, user2, year, week, league} = req.body;
  // TODO: integer constraint in DB
  const gameID = generateFantasyGameID(user1 + user2 + year + week + league);
  const gameWeek = year + 'W' + week;
  // TODO: NaN
  const user1Score = await getUserScoreForWeek(user1, league, gameWeek);
  const user2Score = await getUserScoreForWeek(user2, league, gameWeek);
  const matchupInsert = await manager.query(INSERT_NEW_MATCHUP_QUERY, [gameID, user1, user2, gameWeek,
    user1Score, user2Score, league]);
  console.log(matchupInsert);

  res.status(201).send("Matchup successfully created.");
})

module.exports = router;
