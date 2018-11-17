const express = require('express');
const router = express.Router();
const manager = require('../src/db-manager.js');

/* POST user login. */
router.post('/login', async function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const userQuery = await manager.query('SELECT username, passwords FROM public.users WHERE username = \'' + username + '\';');
  const leagueQuery = await manager.query('SELECT leaguename FROM playsin WHERE username = \'' + username + '\';');
  const leagues = leagueQuery.rows.map(league => league.leaguename.trim());
  const commishQuery = await manager.query('SELECT commissioner_username FROM commissioner WHERE commissioner_username = \'' + username + '\';');
  const isCommissioner = !!commishQuery.rows.length;
  const userExists = userQuery.rows.some(user => user.username.trim() === username && user.passwords.trim() === password);
  userExists ?
    res.json({"username": username, "userLeagues": leagues, "isCommissioner": isCommissioner})
    : res.status(401).send("Invalid username");
});

router.post('/register', async function(req, res) {
  const username = req.body.username; 
  const password = req.body.password;
  // TODO we need a join to see get the user's league(s)
  const query = await manager.query('INSERT INTO users(username, passwords) VALUES (\'' + username + '\', \'' + password + '\');');
  console.log(query);
  res.status(200).send("Registration Successful");
});

module.exports = router;
