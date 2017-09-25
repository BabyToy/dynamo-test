const os = require("os");
var app = require("express")();
var tester = require("./dynamo-test");
// tester.init();
tester.append({
    name: "user1",
    created: new Date().getDate().toISOString()
});

app.get("/", function (request, response) {
    response.send("Listening on http://" + os.hostname() + ":" + listener.address().port);
});

app.get("/testrun", function (request, response) {
    response.send(tester.run());
});

var listener = app.listen(3000, function () {
    console.log("http://" + os.hostname() + ":" + listener.address().port);
})

