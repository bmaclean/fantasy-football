const express = require('express');
const router = express.Router();
// TODO: validate username from DB
const users = ['brendan', 'imey', 'michela', 'aine']

/* POST user login. */
router.post('/', function(req, res) {
  const username = req.body.username;
  users.includes(username) ? 
    res.json(req.body)
    : res.status(401).send("Invalid username");
});

module.exports = router;
