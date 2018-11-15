const express = require('express');
const router = express.Router();

/* GET users listing. */
router.post('/', function(req, res) {
  console.log(req.body)
  // res.json([
  //   {username: 'bmaclean'},
  //   {username: 'imey'}
  // ]);
  res.json(req.body)
});

module.exports = router;
