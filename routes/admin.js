var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const common = require('../common/common.js');

router.get('/generate', function(req, res, next) {
  var key = common.createKey();
  res.send("public key: " + key.publicKey + " private key: " + key.privateKey);
});

module.exports = router;
