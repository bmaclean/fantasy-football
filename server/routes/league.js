const express = require('express');
const router = express.Router();
const manager = require('../src/db-manager.js');

/* POST user login. */
router.post('/users', async function(req, res) {
  const league = req.body.league;
  const usersQuery = await manager.query('SELECT username FROM playsin WHERE leaguename = \'' + league + '\';');
  const users = usersQuery.rows.map(user => user.username.trim());
  usersQuery.rowCount ?
    res.json({"users": users})
    : res.status(401).send("Users not found.");
});

module.exports = router;