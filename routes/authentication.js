var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../schema/user.js');
const common = require('../common/common.js');

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({username: username, password: password}, function (err, user) {
    if(err) {
      console.log(err);
      return res.status(500).send();
    }
    if(!user) {
      return res.status(404).send();
    }
    return res.status(200).send(user.type);
  });
});

router.post('/register', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var type = req.body.type;

  var newUser = new User();
  newUser.username = username;
  newUser.password = password;
  newUser.firstname = firstname;
  newUser.lastname = lastname;
  newUser.type = type;
  common.getMongoConnection();
  newUser.save(function(err, savedObj){
    if (err) {
      console.error(err);
      res.status(500).send();
    }
      res.status(200).send();
  });
});

router.get('/users', function(req, res, next) {
  mongoose.model('users').find(function(err, txn) {
    res.send(txn);
  });
});


module.exports = router;
