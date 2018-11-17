const express = require('express');
const router = express.Router();
const manager = require('../src/db-manager.js')

const temp_users = ['brendan', 'imey', 'michela', 'aine']
const temp_leagues = [''] 

/* POST user login. */
router.post('/', async function(req, res) {
  const username = req.body.username;
  // TODO we need a join to see get the user's league(s)
  const query = await manager.query('SELECT username FROM public.users WHERE username = \'' + username + '\';');
  console.log(query.rows.some(user => user.username.trim() === username))
  const userExists = query.rows.some(user => user.username.trim() === username);
  userExists ?
    res.json({"username": username, "userLeagues": ['0001', '0002', '0101'], "isCommissioner": true})
    : res.status(401).send("Invalid username");
});

module.exports = router;
