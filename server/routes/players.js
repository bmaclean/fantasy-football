var express = require('express');
var router = express.Router();

router.post('/add', function(req, res, next) {
  let pid = req.body.pid;
  let username = req.body.username;
  let leaguename = req.body.leaguename;
  res.json({ operation: "add", player: pid, user: username, league: leaguename });
});

router.post('drop', function(req, res, next) {
  let pid = req.body.pid;
  let username = req.body.username;
  let leaguename = req.body.leaguename;
  res.json({ operation: "drop", player: pid, user: username, league: leaguename });
});

module.exports = router;
