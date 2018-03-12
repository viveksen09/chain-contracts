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
    'pub_key': '4aAyvgT5VzTW13ZbHMcQsoAYzQCLSJvT6iu2ZtJUbcRe',
    'prv_key': 'Dgo4iGM7hXvqzdutoqpyYXneWA8sV3mhSFSBjq1Qy6rU'
  },
  'wad': {
    'pub_key': '2Nbiu4AsgC3JS9jEqPqxZ1HesTxNYUbQqtoKEFnCwso9',
    'prv_key': '5WELrtfyDdJNTFbTmwLBcMXgUuRvaE54qhGYDYbCjXxp'
  },
  'hak': {
    'pub_key': '8jsN52pVGU8394QMGYTzYBovXvZALi5Woy84SiKbwT7g',
    'prv_key': '7C47BEPZG2gjj3h6VED5acMF8XksnmAWrWwWoDTdcam6'
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
