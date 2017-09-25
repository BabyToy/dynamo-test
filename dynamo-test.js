const db = require("./model");
const uuidGen = require("uuid");
var users = new db("Users");

exports.init = function () {
    var params = {
        TableName: users.tableName,
        KeySchema: [
            { AttributeName: "id", KeyType: "HASH" },  //Partition key
            { AttributeName: "username", KeyType: "RANGE" }  //Sort key
        ],
        AttributeDefinitions: [
            { AttributeName: "id", AttributeType: "S" },
            { AttributeName: "username", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10
        }
    };
    users.create(params);
}

exports.run = function () {
    return "from dynamo-test.js";
}

exports.append = function (user) {
    users.put({
        TableName: users.tableName,
        Item: {
            "id": uuidGen.v4(),
            "username": user.name,
            "active": true,
            "created": user.created
        }
    });
}

