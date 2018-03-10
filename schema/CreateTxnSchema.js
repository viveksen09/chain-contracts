var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var createTxn = new Schema({
  userId: Number,
  name: String,
  txId: String
});
var createTransactions = mongoose.model('createTransaction', createTxn);

module.exports = createTransactions;
