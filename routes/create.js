var express = require('express');
var driver = require('bigchaindb-driver');
var mongoose = require('mongoose');
var router = express.Router();

const contract = require('../model/contract.js');
const coin = require('../model/coin.js');
const common = require('../common/common.js');
const API_PATH = 'http://localhost:9984/api/v1/';
const conn = new driver.Connection(API_PATH);
var contractTypes = require('../schema/contractTypes.js');

var Schema = mongoose.Schema;

var createTxn = new Schema({
  userId: Number,
  name: String,
  txId: String
});
var createTransactions = mongoose.model('createTransaction', createTxn);

router.get('/', function(req, res, next) {
  const keys = common.getKeys();
  const asset = contract.purchaseOrder;
  const metadata = common.getMetadata();
  const txCreateAliceSimple = driver.Transaction.makeCreateTransaction(
        asset,
        metadata,
        [ driver.Transaction.makeOutput(
                driver.Transaction.makeEd25519Condition(keys.b_pbub_key))
        ],
        keys.b_pbub_key
      );
      const txCreateAliceSimpleSigned = driver.Transaction.signTransaction(txCreateAliceSimple, keys.b_pbub_key);
      conn.postTransaction(txCreateAliceSimpleSigned);
      var transactionId = txCreateAliceSimpleSigned.id;
      writeToDB(transactionId);
      res.send('Contract id : ' + transactionId);
});

function writeToDB(transactionId) {
var newTxn = new createTransactions();
  common.getMongoConnection();
  newTxn.name = "Bob";
  newTxn.userId = 101;
  newTxn.txId = transactionId;

console.log("i am here");
  newTxn.save();
}

module.exports = router;
