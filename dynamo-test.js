const Db = require('./model');
const uuidGen = require('uuid');
var users = new Db('Users');

exports.init = function () {
  var params = {
    TableName: users.tableName,
    KeySchema: [
      { AttributeName: 'id', KeyType: 'HASH' } // Partition key
      // { AttributeName: 'username', KeyType: 'RANGE' } // Sort key
    ],
    AttributeDefinitions: [
      { AttributeName: 'id', AttributeType: 'S' }
      // { AttributeName: 'username', AttributeType: 'S' }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10
    }
  };
  users.create(params);
}

exports.run = function () {
  return 'from dynamo-test.js';
}

exports.append = function (user) {
  var item = {
    'id': uuidGen.v4(),
    'username': user.username,
    'active': true,
    'characterlevel': parseInt(user.characterlevel),
    'created': new Date().toISOString()
  }
  users.put({
    TableName: users.tableName,
    Item: item
  });
}

exports.update = function (user) {
  var params = {
    TableName: users.tableName,
    Key: {
      'id': user.id
    },
    UpdateExpression: 'set characterlevel = :characterlevel',
    ExpressionAttributeValues: { ':characterlevel': parseInt(user.characterlevel) },
    ReturnValues: 'UPDATED_NEW'
  }
  users.update(params);
}
