let aws = require('aws-sdk');
aws.config.update({
  region: 'ap-southeast-1'
});

//
class Model {
  constructor (tableName) {
    this.db = new aws.DynamoDB();
    this.tableName = tableName;
    this.accessKeyId = aws.config.credentials.accessKeyId;
    this.secretAccessKey = aws.config.credentials.secretAccessKey;
    this.documentClient = new aws.DynamoDB.DocumentClient({
      region: aws.config.region,
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
      apiVersion: '2012-08-10'
    });
  }
  create (tableParams) {
    console.log('Create method', tableParams.TableName);

    this.db.createTable(tableParams, function (error, data) {
      if (error) {
        console.error('Error creating table ', JSON.stringify(error, null, 2));
      } else {
        console.log('Table created.', JSON.stringify(data, null, 2));
      }
    })
  }

  drop() {
    console.log('Drop method');
  }
  put(item) {
    this.documentClient.put(item, function (error, data) {
      if (error)
        console.error('Error adding item ', JSON.stringify(error, null, 2));
      else
        console.log('Item added ', JSON.stringify(data, null, 2));
    });
  }
  findByYear(queryData, callBack) {
    var params = {
      TableName: this.tableName,
      KeyConditionExpression: '#yr = :yyyy',
      ExpressionAttributeNames: {
        '#yr': 'year'
      },
      ExpressionAttributeValues: {
        ':yyyy': queryData.year
      }
      // Select: 'COUNT'
    };
    // this.documentClient.query({
    //     TableName: this.tableName,
    //     Key: { 'year': queryData.year }
    // }, function (error, data) {
    this.documentClient.query(params, function (error, response) {
      callBack(error, response)
    });
  }
}

module.exports = Model;