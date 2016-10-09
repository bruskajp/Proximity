var express = require('express');
var router = express.Router();
var dbInterface = require('../Server/mongoApi');

router.route('/getAvailable')
  .get(function(req, res) {
    dbInterface.getAvailable(req.loc, function(data) {
        return res.send(200, data);
    });
  });

router.route('/getTopics')
  .get(function(req, res) {
    dbInterface.getDefaultTopics(function(data) {
      return res.send(200, data);
    });
  });

router.route('/topicExists')
  .get(function(req, res) {
    dbInterface.topicExists(rec.loc, req.topic, function(data) {
      return res.send(200, data);
    });
  });

router.route('/getPreviousMessages')
  .get(function(req, res) {
    dbInterface.getPreviousMessages(req.loc, req.topic, function(data) {
      return res.send(200, data);
    });
  });

module.exports = router;
