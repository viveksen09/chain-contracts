var express = require('express');
var driver = require('bigchaindb-driver');
var router = express.Router();

const contract = require('../model/contract.js');
const coin = require('../model/coin.js');
const API_PATH = 'http://localhost:9984/api/v1/';
const conn = new driver.Connection(API_PATH);

router.get('/', function(req, res, next) {
  //console.log(contract.freightForwardingRequest.item);
  res.send('Ok');
});

module.exports = router;
