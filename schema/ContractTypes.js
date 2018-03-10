var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contractTypes1 = new Schema({
  id: Number,
  name: String
});
var contractTypes1 = mongoose.model('kcontractTypes', contractTypes1);

module.exports = contractTypes1;
