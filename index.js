const os = require('os');
var app = require('express')();
var tester = require('./dynamo-test');
var parser = require('body-parser');

tester.init();
// tester.append({
//   name: 'user2',
//   created: new Date().toISOString(),
//   characterlevel: 0
// });

// configure middleware for express
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(function (error, request, response, next) {
  if (error) {
    response.status(200).send();
  } else {
    response.status(201);
    next();
  }
});

console.log(new Date().toISOString());

app.get('/', function (request, response) {
  response.send('Listening on http://' + os.hostname() + ':' + listener.address().port);
});

app.post('/add', function (request, response) {
  tester.append({
    username: request.body.username,
    characterlevel: request.body.characterlevel
  });
  response.status(200).send();
});

app.post('/update', function (request, response) {
  tester.update({
    id: request.body.id,
    characterlevel: request.body.characterlevel
  });
  response.send(JSON.stringify({
    id: request.body.id || null,
    characterlevel: request.body.characterlevel || null
  }));
});

app.get('/testrun', function (request, response) {
  response.send(tester.run());
});

var listener = app.listen(3000, function () {
  console.log('http://' + os.hostname() + ':' + listener.address().port);
})
