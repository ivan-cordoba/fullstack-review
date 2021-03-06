const express = require('express');
var bodyParser = require('body-parser');
var db = require('../database/index.js');
var gh = require('../helpers/github.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  var username = req.body.username;
  gh.getReposByUsername(username, (error, response, body) => {
    var repos = JSON.parse(body);
    db.save(repos, () => {
      res.end('Repos stores in DB');
    });
  });
  
});

app.get('/repos', function (req, res) {
  console.log(req.method);
  db.get((err, data) => {
    if(err) throw err;
    res.statusCode = 200;
    res.type('text');
    res.end(JSON.stringify({data: data}));
  });
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

