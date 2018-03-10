var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//var contractTypes = require('../schema/contractTypes.js');

var mySchema = mongoose.Schema({
  id: Number,
  name: String
});

var ContractTypes = mongoose.model('contractTypes', mySchema);


router.get('/', function(req, res, next) {
  /*var newCtype = new ContractTypes();
  mongoose.connect('mongodb://localhost/vivekdb');
  newCtype.id = 3;
  newCtype.name = 'TestPurchase';
  newCtype.save(function(err, savedObj){
    if (err) {
      console.error(err);
      res.status(500).send();
    }
    else {
      res.send(savedObj);
    }
  })*/

/*
  mongoose.model('contractTypes').find(function(err, contractTypes) {
    res.send(contractTypes);
    contractTypes.forEach(function(element) {
      console.log(element.name)
    });
  });*/

  mongoose.model('createTransaction').find(function(err, txn) {
    res.send(txn);
  });


});

module.exports = router;
