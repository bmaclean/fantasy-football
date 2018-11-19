const express = require('express');
const router = express.Router();
const manager = require('../src/db-manager.js');

const GET_TEAM_QUERY = 'SELECT P.pid, P.firstname, P.lastname, P.teamname, P.position '+
  'FROM PlaysFor PF, Player P WHERE PF.pid = P.pid AND PF.leaguename = $1 AND PF.username = $2';
const TRADE_QUERY = 'UPDATE PlaysFor SET pid = $3 WHERE pid = $2 AND username = $1';
const GET_NFL_TEAM_DETAILS = 'SELECT P2.pid, P2.firstname, P2.lastname, T.teamname, T.stadium, T.city ' +
  `FROM nflteam as T, (${GET_TEAM_QUERY}) as P2 WHERE P2.teamname = T.teamname`;

/* POST user login. */
router.post('/', async function(req, res) {
  // TODO: get players based on username, league
  const {username, league} = req.body;
  console.log(username, league)
  const result = await manager.query(GET_TEAM_QUERY, [league, username]);
  const myTeam = result.rows.map(player =>
    ({
      pid: player.pid,
      firstName: player.firstname.trim(),
      lastName: player.lastname.trim(),
      team: player.teamname && player.teamname.trim(),
      position: player.position.trim()
    })
  )
  result.rowCount ?
    res.json(myTeam)
    : res.status(400).send("No Players Found");
});

router.post('/trade', async function(req, res) {
  // TODO: get players based on username, league
  const { user1, user2, pid1, pid2} = req.body;
  console.log(user1, user2, pid1, pid2)
  const tradeQuery1 = await manager.query(TRADE_QUERY, [user1, pid1, pid2]);
  const tradeQuery2 = await manager.query(TRADE_QUERY, [user2, pid2, pid1]);
  console.log(2, tradeQuery2)
  res.status(200).send("Trade Successful");
});

router.post('/details', async function(req, res, next) {
  const {username, league} = req.body;
  try {
    const details = await manager.query(GET_NFL_TEAM_DETAILS, [league, username]);
    res.status(200).send(details.rows);
  } catch (err) {
    res.status(400).send(JSON.stringify(err));
  }
});

module.exports = router;
