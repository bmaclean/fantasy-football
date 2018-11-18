var express = require('express');
var router = express.Router();
var populateGameweek = require('./populate-gameweek.js');

router.post('/gameweek', async function(req, res, next) {
  try {
    const result = await populateGameweek();
    console.log(result);
    res.status(201).send("Gameweek table populated successfully.");
  } catch (err) {
    res.status(500).send(`Could not populate gameweek table. Error: ${JSON.stringify(err)}`);
  }
});

module.exports = router;
