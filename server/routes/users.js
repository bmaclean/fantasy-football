const express = require('express');
const router = express.Router();

/* POST user login. */
router.post('/', function(req, res) {
  console.log(req.body)
  // res.json([
  //   {username: 'bmaclean'},
  //   {username: 'imey'}
  // ]);
  res.json(req.body)
});

module.exports = router;
