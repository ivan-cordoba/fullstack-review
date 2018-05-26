const request = require('request');
const config = require('../config.js');
var Promise = require('bluebird');

let getReposByUsername = (username) => {

  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    method: 'GET',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if(error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  }); 
}

module.exports.getReposByUsername = getReposByUsername;