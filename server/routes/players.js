var express = require('express');
var router = express.Router();
const manager = require('../src/db-manager.js');

const DROP_QUERY = 'DELETE FROM playsfor WHERE pid = $1 AND username = $2 AND leaguename = $3';
const ADD_QUERY = 'INSERT INTO playsfor VALUES($1, $2, $3)';
const ROSTER_SIZE_QUERY = 'SELECT rostersize FROM fantasyleague WHERE leaguename = $1';
const NUM_PLAYERS_IN_ROSTER_QUERY = 'SELECT COUNT(*) FROM playsfor WHERE username = $1 AND leaguename = $2';
const ERROR_NAME = 'error';

const getRosterSize = async (leaguename) => {
  const result = await manager.query(ROSTER_SIZE_QUERY, [leaguename]);
  return result.rows[0].rostersize;
};

const getNumPlayersInRoster = async (username, leaguename) => {
  const result = await manager.query(NUM_PLAYERS_IN_ROSTER_QUERY, [username, leaguename]);
  return result.rows[0].count;
};

router.post('/add', async function(req, res, next) {
  let pid = req.body.pid;
  let username = req.body.username;
  let leaguename = req.body.leaguename;
  let params = [username, leaguename, pid];
  const rostersize = await getRosterSize(leaguename);
  const playersInRoster = await getNumPlayersInRoster(username, leaguename);

  if (playersInRoster >= rostersize) {
    res.status(400).send(`Add player unsuccessful. Rosters can have at most ${rostersize} players.`);
  }

  const result = await manager.query(ADD_QUERY, params);
  if (result.name === ERROR_NAME) {
    res.status(400).send("Add player unsuccessful. Detail: " + result.detail);
  } else {
    res.status(201).send("Player added successfully.");
  }
});

router.post('/drop', async function(req, res, next) {
  let pid = req.body.pid;
  let username = req.body.username;
  let leaguename = req.body.leaguename;
  let params = [pid, username, leaguename];
  const result = await manager.query(DROP_QUERY, params);
  if (result.rowCount > 0) {
    res.status(201).send(`Successfully dropped row ${JSON.stringify(params)}`);
  } else {
    res.status(400).send(`Could not find row matching ${JSON.stringify(params)}`);
  }
});

module.exports = router;
