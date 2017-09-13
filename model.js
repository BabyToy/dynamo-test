let aws = require("aws-sdk");
aws.config.update({
    region: "ap-southeast-1",
    endpoint: "http://localhost:8000"
});

class Model {
    constructor() {
        this.db = new aws.DynamoDB();
    }
    create(tableParams) {
        console.log("Create method", tableParams.TableName);
        this.tableParams = tableParams.TableName;

        this.db.createTable(params, function (){
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