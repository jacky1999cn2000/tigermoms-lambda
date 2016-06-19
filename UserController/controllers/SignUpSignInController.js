'use strict';

var authService = require('../services/AuthService.js');
var awsService = require('../services/AwsService.js');
var co = require('co');

module.exports = {
  /*
    check a specific user's existence
  */
  check: function* (event, context){
    return co(function* (){
      let params = {
          TableName : 'User',
          KeyConditionExpression: "username = :username",
          ExpressionAttributeValues: {
              ":username":event.params.username
          }
      };

      try{
        let response = yield awsService.query(params);
        let users = response.data.Items || [];
        return users;
      }catch(ex){
        let error = {
          status: 'error',
          message: ex.message,
          code: ex.code
        }
        return error;
      }
    });
  },

  /*
    user signup
  */
  signUp: function* (event, context){
    return co(function* (){
      let item = event.body;
      item.password = authService.hashPassword(item.password);

      let params = {
        TableName: 'User',
        Item: item,
        ConditionExpression: 'attribute_not_exists(username)'
      };

      try{
        let response = yield awsService.put(params);
        delete item.password;
        return item;
      }catch(ex){
        let error;
        if(ex.code == 'ConditionalCheckFailedException'){
          error = {
            status: 'error',
            message: '用户 \'' + item.username + '\'' + ' 已存在.'
          }
        }else{
          error = {
            status: 'error',
            message: ex.message,
            code: ex.code
         }
        }
        return error;
      }
    });
  },

  /*
    user signin
  */
  signIn: function* (event, context){
    return co(function* (){
      let item = event.body;
      let error;

      let params = {
          TableName : 'User',
          KeyConditionExpression: "username = :username",
          ExpressionAttributeValues: {
              ":username":item.username
          }
      };

      try{
        let response = yield awsService.query(params);
        let users = response.data.Items || [];

        if(users.length == 0){
          error = {
            status: 'error',
            message: '用户 ' + item.username + ' 不存在.'
          }
          return error;
        }else{
          let user = users[0];
          if(!authService.comparePassword(item.password,user.password)){
            error = {
              status: 'error',
              message: '密码不正确.'
            }
            return error;
          }else{
            delete user.password;
            return user;
          }
        }
      }catch(ex){
        error = {
          status: 'error',
          message: ex.message,
          code: ex.code
        }
        return error;
      }
    });
  },

};
