var express = require('express');
var router = express.Router();
const manager = require('../src/db-manager.js');

const TOTAL_SCORES_QUERY = 'SELECT user1 as username, SUM(SeasonScores.user1score) as score ' +
  'FROM (SELECT user1, user1score FROM fantasygame WHERE leaguename = $1 UNION ALL ' +
	'SELECT user2, user2score FROM fantasygame WHERE leaguename = $1) as SeasonScores ' +
  'GROUP BY user1 ORDER BY SUM(SeasonScores.user1score) DESC';

const HIGHEST_SCORES_BY_WEEK = 'SELECT FG.gameweek, FG.user1, FG.user1score, FG.user2, FG.user2score ' +
'FROM fantasygame FG, ' +
  '(SELECT SeasonScores.gameweek, MAX(SeasonScores.user1score) as highscore ' +
  'FROM (SELECT user1, user1score, gameweek FROM fantasygame WHERE leaguename = $1 ' +
	'UNION ALL SELECT user2, user2score, gameweek FROM fantasygame WHERE leaguename = $1) as SeasonScores ' +
  'GROUP BY SeasonScores.gameweek) as GameweekScores ' +
  'WHERE FG.gameweek = GameweekScores.gameweek AND (FG.user1score = GameweekScores.highscore OR FG.user2score = highscore) ' +
  'ORDER BY FG.gameweek DESC';

/* GET leaders */
router.post('/', async function(req, res, next) {
  const leaguename = req.body.leaguename;
  const result = await manager.query(TOTAL_SCORES_QUERY, [leaguename]);
  console.log(result);
  if (result.error) {
    res.status(400).send(result.detail);
  } else {
    res.status(200).send(result.rows);
  }
});

router.post('/weekly', async function(req, res, next) {
  const leaguename = req.body.leaguename;
  const result = await manager.query(HIGHEST_SCORES_BY_WEEK, [leaguename]);
  console.log(result);
  if (result.error) {
    res.status(400).send(result.detail);
  } else {
    res.status(200).send(result.rows);
  }
});

module.exports = router;
