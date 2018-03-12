var express = require('express');
var driver = require('bigchaindb-driver');
var mongoose = require('mongoose');
var PythonShell = require('python-shell');
var Promises = require('promise');
const execSync = require('child_process').execSync;
var router = express.Router();

const API_PATH = 'http://localhost:9984/api/v1/';
const conn = new driver.Connection(API_PATH);
const common = require('../common/common.js');
var createdContracts = require('../schema/createdcontracts.js');
var fulfilledContracts = require('../schema/fulfilledcontracts.js');

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
      console.log(txCreateEnterpriseSimpleSigned);
      var transactionId = txCreateEnterpriseSimpleSigned.id;
      writeToDB(username, transactionId);
      res.send(transactionId);
});

router.get('/contracts/:username', function(req, res, next) {
  createdContracts.find({username: req.params.username}, function (err, results) {
    res.send(results);
  });
});

router.get('/contracts/status/:txid', function(req, res, next) {
  var status = conn.getStatus(req.params.txid);
  res.send(status);
});

router.post('/contract/accepting', function(req, res, next) {
  var assetId = req.body.txid;
  var accepteduser = req.body.accepteduser;
  var originaluser = req.body.originaluser;
  const metadata = common.getMetadata();
  const acc_keys = common.getDemoKeys(accepteduser);
  const org_keys = common.getDemoKeys(originaluser);
  const conn = new driver.Connection(API_PATH);
  console.log(assetId);
  const txCreateEnterpriseSimpleSigned = conn.getTransaction(assetId);
  console.log(txCreateEnterpriseSimpleSigned);
  const txTransferSupplier = driver.Transaction.makeTransferTransaction([{ tx: txCreateEnterpriseSimpleSigned, output_index: '0'}],
        [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(acc_keys.pub_key))],
        metadata
      );
      const txTransferSupplierSigned = driver.Transaction.signTransaction(txTransferSupplier, org_keys.prv_key);
      conn.postTransaction(txTransferSupplierSigned);
      var transactionId = txTransferSupplierSigned.id;
      writeFulfiledTransactionToDB();
      res.send(transactionId);
});

router.post('/contract/accept', function(req, res, next) {
  var assetId = req.body.txid;
  var accepteduser = req.body.accepteduser;
  var originaluser = req.body.originaluser;
  const metadata = common.getMetadata();
  const acc_keys = common.getDemoKeys(accepteduser);
  const org_keys = common.getDemoKeys(originaluser);
  var transactionId = callPythonToTransferTransaction(assetId, acc_keys.pub_key, org_keys.prv_key);
  console.log(transactionId);
  //writeFulfiledTransactionToDB();
  res.status(200).send();
});

function writeToDB(username, transactionId) {
var contract = new createdContracts();
  common.getMongoConnection();
  contract.username = username;
  contract.assetId = transactionId;
  contract.save();
}

function writeFulfiledTransactionToDB(originaluser, accepteduser, transactionId) {
  var fcontract = new fulfilledContracts();
  common.getMongoConnection();
  fcontract.initiator = originaluser;
  fcontract.acceptor = accepteduser;
  fcontract.assetId = transactionId;
  contract.save();
}

function callPythonToTransferTransaction(assetId, acceptor_pub_key, originator_priv_key) {
  var result;
  var promises = []
  var options = {
  mode: 'text',
  pythonPath: '/usr/bin/python3',
  pythonOptions: ['-u'], // get print results in real-time
  scriptPath: '__dirname/../scripts/',
  args: [assetId, acceptor_pub_key, originator_priv_key]
  };
   promises.push(PythonShell.run('transferContract.py', options, function (err, results) {
  if (err) throw err;
  result = results[0];
  console.log("1: " + result);
})).then(() => {
  console.log("2: " + result);
});
  return result;
}

function callPythonToTransferTransaction2(assetId, acceptor_pub_key, originator_priv_key) {
  var result;
  promisess = [];
  var options = {
  mode: 'text',
  pythonPath: '/usr/bin/python3',
  pythonOptions: ['-u'], // get print results in real-time
  scriptPath: '__dirname/../scripts/',
  args: [assetId, acceptor_pub_key, originator_priv_key]
  };
  var promise = new Promises(PythonShell.run('transferContract.py', options, function (err, results) {
  if (err) throw err;
  result = results[0];
  console.log("1: " + result);
}));
promisess.push(promise);
  Promise.all(promisess).then(() => {
  console.log("2: " + result);
  return result;
});
}


module.exports = router;
