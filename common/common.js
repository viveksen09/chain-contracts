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

const demoKeys = {
  'bux': {
    'pub_key': 'EeHiD5rQgwJhzvMpRjZwqKYzZLy4ACC6W4tFfhWPyP27',
    'prv_key': '31mWGkPAEW9cvCriZM2QKHzht5XxhPmnDux4np2NaVdS'
  },
  'wad': {
    'pub_key': 'FPZVNJSjhKzG38s2sjxSudRNkB7ANuBqk1TUecCJPvja',
    'prv_key': 'AW62KGWcgUZAHEp3dvUgazeDu7dBKK8Hx9iGt1LXxvfU'
  },
  'hak': {
    'pub_key': '8GdofCc4to7woXiyjH2uUgfhK2pzYucpS6RPdM6SAQbv',
    'prv_key': 'Fpgf3cSLXLhUHWKAiNNNeyxxaFbZXddnRW6FZyitBFr4'
  }
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
  getDemoKeys: (user) => {
    var keys;
    switch (user) {
      case 'Bucks':
        keys = demoKeys.bux;
        break;
      case 'Wade':
        keys = demoKeys.wad;
        break;
      case 'Hakinnen':
        keys = demoKeys.hak;
        break;
      default:
        keys = demoKeys.bux;
    }
    return keys;
  },

  getMetadata: () => {
    return metadata;
  },
  getMongoConnection: () => {
    return mongoConnection;
  }

}

module.exports = Common;
