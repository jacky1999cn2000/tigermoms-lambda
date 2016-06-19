'use strict';

var authService = require('./services/AuthService.js');
var awsService = require('./services/AwsService.js');
var co = require('co');

exports.handler = function(event, context){

  co(function* (){
    let item = {
      username: 'jacky@gmail.com',
      password: '111111'
    }
    item.password = authService.hashPassword(item.password);

    let params = {
      TableName: 'User',
      Item: item,
      ConditionExpression: 'attribute_not_exists(username)'
    };

    let response = yield awsService.put(params);
    delete item.password;
    context.succeed(item);
  })
  // .then(function(response){
  //
  // })
  .catch(function(ex){
    console.log('*** catch ***');
    console.log(ex);
    let error;
    if(ex.code == 'ConditionalCheckFailedException'){
      error = {
        message: '用户 \'' + item.username + '\'' + ' 已存在.'
      }
    }else{
      error = {
       message: ex.message,
       code: ex.code
     }
    }
    context.fail(error);
  });

}
