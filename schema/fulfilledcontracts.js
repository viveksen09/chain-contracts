var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fContracts = new Schema({
  initiator: String,
  acceptor: String,
  assetId: {type: String, unique: true},
  intent: String
});

var fulfilledContracts = mongoose.model('fullfilledcontracts', fContracts);

module.exports = fulfilledContracts;
