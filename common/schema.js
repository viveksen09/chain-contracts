var driver = require('bigchaindb-driver');
var mangoose = require('mongoose');
const API_PATH = 'http://localhost:9984/api/v1/';
const conn = new driver.Connection(API_PATH);
var Schema = mongoose.Schema;


const Schema = {

  createCreateTxSchema: () => {
    var CreateTxSchema = new Schema({
      userId: String,
      txId: String,
    });
    return createCreateTxSchema;
  },

  createModals: () => {
    var TxModel = mongoose.model('createTransactions', createModals);
    console.console.log(TxModel);
  }
}

module.exports = Schema;
