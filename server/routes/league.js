const express = require('express');
const router = express.Router();
const manager = require('../src/db-manager.js');

const INSERT_USER_TO_LEAGUE = 'INSERT INTO playsin(username, leaguename) VALUES($1, $2);';
const DELETE_USER_FROM_PLAYSIN = 'DELETE FROM playsin WHERE username = $1 AND leaguename = $2;';
const DELETE_USER_FROM_PLAYSFOR = 'DELETE FROM playsfor WHERE username = $1 AND leaguename = $2;';
const ERROR_NAME = 'error';

router.post('/users', async function(req, res) {
  const league = req.body.league;
  const usersQuery = await manager.query('SELECT username FROM playsin WHERE leaguename = \'' + league + '\';');
  const users = usersQuery.rows.map(user => user.username.trim());
  usersQuery.rowCount ?
    res.json({"users": users})
    : res.status(401).send("Users not found.");
});

router.post('/users/add', async function(req, res) {
  const {username, league} = req.body;
  const addUserQuery = await manager.query(INSERT_USER_TO_LEAGUE, [username, league]);
  console.log(addUserQuery);
  addUserQuery.name !== ERROR_NAME ?
    res.status(200).send("User successfully added.")
    : res.status(401).send("That user cannot be added.");
});

router.post('/users/drop', async function(req, res) {
  const {username, league} = req.body;
  const playsinQuery = await manager.query(DELETE_USER_FROM_PLAYSIN, [username, league]);
  const playsforQuery = await manager.query(DELETE_USER_FROM_PLAYSFOR, [username, league]);
  console.log(playsinQuery);
  console.log(playsforQuery);
  playsinQuery.rowCount ?
    res.status(200).send("User successfully removed.")
    : res.status(401).send("User cannot be removed.");
});

module.exports = router;