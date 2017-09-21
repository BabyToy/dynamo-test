var model = require("./model");

var table = new model("Movies");
console.log("Key:", table.accessKeyId);
console.log("Secret:", table.secretAccessKey);
var schema = {
    TableName: table.tableName,
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

// table.put({
//     TableName: table.tableName,
//     Item: {
//         year: 2017,
//         title: "Logan"
//     }
// });

// console.log("DocumentClient API version", table.documentClient.)
// console.log("end:", this.tableName);
var items = table.findByYear({
    year: 2017
});
console.log(items.length);
