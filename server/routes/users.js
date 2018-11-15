const express = require('express');
const router = express.Router();
// TODO: validate username from DB
const temp_users = ['brendan', 'imey', 'michela', 'aine']
const temp_leagues = ['']

/* POST user login. */
router.post('/', function(req, res) {
  const username = req.body.username;
  temp_users.includes(username) ? 
    res.json({"username": username, "userLeagues": ['0001', '0002', '0101'], "isCommissioner": true})
    : res.status(401).send("Invalid username");
});

module.exports = router;
