const express = require('express');
const router = express.Router();
const manager = require('../src/db-manager.js');

const GET_TEAM_QUERY = 'SELECT * FROM PlaysFor PF, Player P WHERE PF.pid = P.pid AND PF.leaguename = $1 AND PF.username = $2'

/* POST user login. */
router.post('/', async function(req, res) {
  // TODO: get players based on username, league
  const {username, league} = req.body;
  console.log(username, league)
  const result = await manager.query(GET_TEAM_QUERY, [league, username]);
  console.log("my result", result);
  const myTeam = result.rows.map(player => 
    ({
      pid: player.pid,
      firstName: player.firstname.trim(),
      lastName: player.lastname.trim(),
      team: player.teamname && player.teamname.trim(),
      position: player.position.trim()
    })
  )
  console.log("my team", myTeam);
  result.rowCount ?
    res.json(myTeam)
    : res.status(400).send("No Players Found");
});

module.exports = router;
