var express = require('express');
var router = express.Router();
const manager = require('../src/db-manager.js');

const DROP_QUERY = 'DELETE FROM playsfor WHERE pid = $1 AND username = $2 AND leaguename = $3';

router.post('/add', function(req, res, next) {
  // STUB
  let pid = req.body.pid;
  let username = req.body.username;
  let leaguename = req.body.leaguename;
  res.json({ operation: "add", player: pid, user: username, league: leaguename });
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
