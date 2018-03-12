var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cContracts = new Schema({
  username: String,
  assetId: {type: String, unique: true},
  intent: String
});

var createdContracts = mongoose.model('createdcontracts', cContracts);

module.exports = createdContracts;
