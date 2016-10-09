var steam = require('steam-web');
var config = require('./config.json');

module.exports = new steam({
  apiKey: config.apikey,
  format: config.format
});