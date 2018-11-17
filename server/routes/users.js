const express = require('express');
const router = express.Router();
const manager = require('../src/db-manager.js')

const temp_users = ['brendan', 'imey', 'michela', 'aine']
const temp_leagues = [''] 

/* POST user login. */
router.post('/', async function(req, res) {
  const username = req.body.username;
  const query = await manager.query('SELECT * FROM pg_catalog.pg_tables;');
  console.log(query)
  temp_users.includes(username) ?
    res.json({"username": username, "userLeagues": ['0001', '0002', '0101'], "isCommissioner": true})
    : res.status(401).send("Invalid username");
});

module.exports = router;
