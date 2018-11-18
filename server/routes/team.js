const express = require('express');
const router = express.Router();
// TODO: validate username from DB

const GET_TEAM_QUERY = 'SELECT * FROM PlaysFor PF, Player P WHERE PF.pid = P.pid'

/* POST user login. */
router.post('/', function(req, res) {
  // TODO: get players based on username, league
  res.json({})
});

module.exports = router;
