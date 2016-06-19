'use strict';

var AWS = require('aws-sdk-promise');
// var awsConfig = require('../config/awsConfig.js');
//
// // credentials are only needed for development.
// if(process.env.NODE_ENV == 'development') {
//   AWS.config.update({
//     region: awsConfig.aws.region,
//     endpoint: awsConfig.aws.endpoint,
//     accessKeyId: awsConfig.aws.accessKeyId,
//     secretAccessKey: awsConfig.aws.secretAccessKey
//   });
// }

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
  query: function(params) {
    return docClient.query(params).promise();
  },

  put: function(params){
    return docClient.put(params).promise();
  },

  update: function(params){
    return docClient.update(params).promise();
  },

  destroy: function(params){
    return docClient.delete(params).promise();
  },

  scan: function(params){
    return docClient.scan(params).promise();
  },

  batchWriteItem: function(params){
    return dynamodb.batchWriteItem(params).promise();
  },

  getUUID: function(){
    return uuid.v1();
  },

  makeRequest: function(requestParams){
    return request(requestParams);
  }
}
