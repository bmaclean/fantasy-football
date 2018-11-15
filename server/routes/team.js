const express = require('express');
const router = express.Router();
// TODO: validate username from DB
const temp_players = [
  {
    "pid": "1234",
    "firstName": "Andrew",
    "lastName": "Luck",
    "position": "QB",
    "team": "IND",
  },
  {
    "pid": "2345",
    "firstName": "Marlon",
    "lastName": "Mack",
    "position": "RB",
    "team": "IND",
  },
  {
    "pid": "5678",
    "firstName": "Baker",
    "lastName": "Mayfield",
    "position": "QB",
    "team": "CLE",
  },
  {
    "pid": "5678",
    "firstName": "Reggie",
    "lastName": "Wayne",
    "position": "WR",
    "team": "IND",
  },
  {
    "pid": "3456",
    "firstName": "T.Y.",
    "lastName": "Hilton",
    "position": "WR",
    "team": "IND",
  },
  {
    "pid": "5678",
    "firstName": "A.J",
    "lastName": "Green",
    "position": "WR",
    "team": "CIN",
  },
  {
    "pid": "4567",
    "firstName": "Marvin",
    "lastName": "Harrison",
    "position": "WR",
    "team": "IND",
  },
  {
    "pid": "2343",
    "firstName": "Ameer",
    "lastName": "Abdullah",
    "position": "RB",
    "team": "DET",
  },
];

/* POST user login. */
router.post('/', function(req, res) {
  // TODO: get players based on username, league
  res.json(temp_players)
});

module.exports = router;
