const express = require('express');
const router = express.Router();
const manager = require('../src/db-manager.js')

const temp_users = ['brendan', 'imey', 'michela', 'aine']
const temp_leagues = ['']
const temp_player = ['112', '214', '574', '489']

/* POST user login. */
router.post('/', async function(req, res) {
  const pid = req.body.pid;
  // TODO: finish this delete query
  const query = await manager.query('SELECT * FROM pg_catalog.pg_tables;');
  console.log(query)
  temp_users.includes(pid) ?
    res.json({"pid": pid})
    : res.status(401).send("Invalid pid");
});

module.exports = router;
