var model = require("./model");
const tableName = "Movies";

var table = new model();
console.log("Key:", table.accessKeyId);
console.log("Secret:", table.secretAccessKey);
var schema = {
    TableName: tableName,
    KeySchema: [
        { AttributeName: "year", KeyType: "HASH" },  //Partition key
        { AttributeName: "title", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "year", AttributeType: "N" },
        { AttributeName: "title", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};
// table.create(schema);

table.put({
    TableName: tableName,
    Item: {
        year: 1984,
        title: "Amadeus"
    }
});

// console.log("DocumentClient API version", table.documentClient.)
console.log("end:", tableName);
