const express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var db = require('../database/index.js');
var gh = require('../helpers/github.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  var username = req.body.username;
  var countBeforeInsert = 0;
  var countAfterInsert = 0;
  var reposData = [];
  db.count()
  .then((count) => {
    countBeforeInsert = count;
    return gh.getReposByUsername(username);
  })
  .then((data) => {
    reposData = JSON.parse(data);
    return db.save(reposData);
  })
  .then((message) => {
    if(message) console.log('DUPLICATES NOT INSERTED');
    return db.count();
  })
  .then((count) => {
    countAfterInsert = count;
    var newCount = countAfterInsert - countBeforeInsert;
    var updatedCount = reposData.length - newCount;
    var responseObj = {new: newCount, updated: updatedCount};
    res.end(JSON.stringify(responseObj));
  })
  .catch((err) => {
    console.error(err);
  });
});

app.get('/repos', function (req, res) {
  console.log(req.method);
  db.get()
  .then((data) => {
    res.statusCode = 200;
    res.type('text');
    res.end(JSON.stringify({data: data}));
  })
  .catch((err) => {
    console.error(err);
  });
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});