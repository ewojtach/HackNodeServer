var getBabelRelayPlugin = require('babel-relay-plugin');

var schemaData = require('./data/ncSchema.json').data;

var plugin = getBabelRelayPlugin(schemaData);

module.exports = plugin;
