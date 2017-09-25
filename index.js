const os = require('os');
var app = require('express')();
var tester = require('./dynamo-test');
var parser = require('body-parser');

// tester.init();
// tester.append({
//     name: 'user1',
//     created: new Date().getDate().toISOString()
// });

// configure middleware for express
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.get('/', function (request, response) {
  response.send('Listening on http://' + os.hostname() + ':' + listener.address().port);
});

app.post('/update', function (request, response) {
  response.send(JSON.stringify({
    key: request.body.key || null,
    value: request.body.value || null
  }));
});

app.get('/testrun', function (request, response) {
  response.send(tester.run());
});

var listener = app.listen(3000, function () {
  console.log('http://' + os.hostname() + ':' + listener.address().port);
})
