var express = require('express');
var driver = require('bigchaindb-driver');
var mongoose = require('mongoose');
var router = express.Router();

const API_PATH = 'http://localhost:9984/api/v1/';
const conn = new driver.Connection(API_PATH);
const common = require('../common/common.js');
var createdContracts = require('../schema/createdcontracts.js');

router.post('/create', function(req, res, next) {
  var item = req.body.item;
  var qty = req.body.qty;
  var value = req.body.value;
  var username = req.body.username;
  const metadata = common.getMetadata();
  const keys = common.getDemoKeys(username);
  const asset = common.buildAsset(item, qty, value);
  const txCreateEnterpriseSimple = driver.Transaction.makeCreateTransaction(
        asset,
        metadata,
        [ driver.Transaction.makeOutput(
                driver.Transaction.makeEd25519Condition(keys.pub_key))
        ],
        keys.pub_key
      );
      const txCreateEnterpriseSimpleSigned = driver.Transaction.signTransaction(txCreateEnterpriseSimple, keys.prv_key);
      conn.postTransaction(txCreateEnterpriseSimpleSigned);
      var transactionId = txCreateEnterpriseSimpleSigned.id;
      writeToDB(username, transactionId);
      res.send(transactionId);
});

function writeToDB(username, transactionId) {
var contract = new createdContracts();
  common.getMongoConnection();
  contract.username = username;
  contract.assetId = transactionId;
  contract.save();
}

module.exports = router;
