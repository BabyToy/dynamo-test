let aws = require("aws-sdk");
aws.config.update({
    region: "ap-southeast-1"
    // endpoint: "http://localhost:8000"
});

class Model {
    constructor() {
        this.db = new aws.DynamoDB();
        this.accessKeyId = aws.config.credentials.accessKeyId;
        this.secretAccessKey = aws.config.credentials.secretAccessKey;
        this.documentClient = new aws.DynamoDB.documentClient({
            region: aws.config.region,
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey
          });
    }
    create(tableParams) {
        console.log("Create method", tableParams.TableName);
        this.tableParams = tableParams;

        this.db.createTable(tableParams, function (){
            if (err)
                console.error("Error creating table ", JSON.stringify(err, null, 2));
            else
                console.log("Table created.", JSON.stringify(data, null, 2));
        })
    }
    drop() {
        console.log("Drop method");
    }
    insert() {
        console.log("Insert method");
    }
}

module.exports = Model;