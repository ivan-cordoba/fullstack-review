const express = require('express');
var bodyParser = require('body-parser');
var db = require('../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log(req.body);
  res.end('Added: ' + req.body);
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log(req.method);
  db.get((err, data) => {
    if(err) throw err;
    res.statusCode = 200;
    res.type('text');
    res.end(JSON.stringify({data: data}));
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

