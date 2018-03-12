var driver = require('bigchaindb-driver');
var mongoose = require('mongoose');

const API_PATH = 'http://localhost:9984/api/v1/';
const conn = new driver.Connection(API_PATH);
const mongoConnection = mongoose.connect('mongodb://localhost/vivekdb');
const metadata = {'type': 'contract'};
const contract = require('../model/contract.js');

const createdKeys = {
  'a_pbub_key': 'Cs7iYv2dsnXaw3j5wpfbuv67DL9uvJtzY1sVkMuAKq6h',
  'a_priv_key': '7XNcGR4ohD7cuM2MY6XxuHAZJCEbdSpeRhQ5KKkuXrx5',
  'b_pbub_key': 'EnXUShaXDtJZisiW6Kxokibw7QKzcJhFeGuSiiizYmwg',
  'b_priv_key': 'Gu9ZeGVV7MzJ2ookCdUJEhdSC8tvx76rRdc9Zgoe7NXR'
}

const demoKeys = {
  'bux': {
    'pub_key': 'CSpt4KjZrSDZzob8i7WdbTpPoGdLdUKQKxVS8vAADDqa',
    'prv_key': 'HLW5Ai6xUf9jnfkuaAtoCKrFv3bodoCNehRhcHxcvJBj'
  },
  'wad': {
    'pub_key': 'AAZP92g2KRphgS78qYdYgxWHwj6gUXywmjTnf1bhjm6q',
    'prv_key': 'Bu6phduPYCx6GKT45LWyqB54qZQowK4816aANo9ekCdz'
  },
  'hak': {
    'pub_key': '4nT19hujSeY57mtWqfTTfuC4kArSjKFeAYMCEv7E46ma',
    'prv_key': '3sfEUKyW2ct27rGMnsT6jnSrya4sgHCdouQ6dTKMzXX6'
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

  buildAsset: (item, qty, value) => {
    const asset = {
      'purchaseOrder': {
              'item': `${item}`,
              'qty': `${qty}`,
              'value': `${value}`
      }
    }
    return asset;
  },

  getMetadata: () => {
    return metadata;
  },
  getMongoConnection: () => {
    return mongoConnection;
  }

}

module.exports = Common;
