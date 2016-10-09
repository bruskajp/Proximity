var express = require('express');
var router = express.Router();

router.route('/available')
  .get(function(req, res) {
    return res.send(200, 'GET available channels.');
  });

router.route('/topics')
  .get(function(req, res) {
    return res.send(200, 'GET list of default topics.');
  });

module.exports = router;
