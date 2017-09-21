let aws = require("aws-sdk");
aws.config.update({
    region: "ap-southeast-1"
});

// 
class Model {
    constructor(tableName) {
        this.db = new aws.DynamoDB();
        this.tableName = tableName;
        this.accessKeyId = aws.config.credentials.accessKeyId;
        this.secretAccessKey = aws.config.credentials.secretAccessKey;
        this.documentClient = new aws.DynamoDB.DocumentClient({
            region: aws.config.region,
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey
          });
    }
    create(tableParams) {    
        console.log("Create method", tableParams.TableName);

        this.db.createTable(tableParams, function (){
            if (err)
                console.error("Error creating table ", JSON.stringify(err, null, 2));
            else
                console.log("Table created.", JSON.st.tableParams.TableNameringify(data, null, 2));
        })
    }
    
    drop() {
        console.log("Drop method");
    }
    put(item) {
        this.documentClient.put(item, function(error, data) {
            if (error)
                console.error("Error adding item ", JSON.stringify(error, null, 2));
            else
                console.log("Item added ", JSON.stringify(data, null, 2));
        });
    }
    findByYear(queryData) {
        var params = {
            ExpressionAttributeValues: {
                "year": queryData.year
            },
            KeyConditionExpression: "#yr = :year",
            ExpressionAttributeNames: {
                "#yr": "year"
            },
            TableName: this.tableName
        };
        this.documentClient.query(params, function(error, data) {
            if (error) 
                console.error("Query error ", JSON.stringify(error, null, 2));
            else
                return data.Items;
        });
    }
}

module.exports = Model;