var driver = require('bigchaindb-driver');
var mongoose = require('mongoose');

const API_PATH = 'http://localhost:9984/api/v1/';
const conn = new driver.Connection(API_PATH);
const mongoConnection = mongoose.connect('mongodb://localhost/vivekdb');
const metadata = {'type': 'contract'};

const createdKeys = {
  'a_pbub_key': 'Cs7iYv2dsnXaw3j5wpfbuv67DL9uvJtzY1sVkMuAKq6h',
  'a_priv_key': '7XNcGR4ohD7cuM2MY6XxuHAZJCEbdSpeRhQ5KKkuXrx5',
  'b_pbub_key': 'EnXUShaXDtJZisiW6Kxokibw7QKzcJhFeGuSiiizYmwg',
  'b_priv_key': 'Gu9ZeGVV7MzJ2ookCdUJEhdSC8tvx76rRdc9Zgoe7NXR'
}

const Common = {
  isCommonCalled: () => {
    console.log("Yes, common is called");
  },
  createKey: () => {
    const key = new driver.Ed25519Keypair();
    return key;
  },
  getKeys: () => {
    return createdKeys;
  },
  getMetadata: () => {
    return metadata;
  },
  getMongoConnection: () => {
    return mongoConnection;
  }
  
}

module.exports = Common;
