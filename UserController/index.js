'use strict';

var co = require('co');
var signUpSignInController = require('./controllers/SignUpSignInController.js');

exports.handler = function(event, context){

  co(function* (){
    let path = event.path;
    let result;

    if(path == '/user/signup'){
      result = yield signUpSignInController.signUp(event,context);
    }else if (path == '/user/signin') {
      result = yield signUpSignInController.signIn(event,context);
    }else if (path == '/user/check/{username}') {
      result = yield signUpSignInController.check(event,context);
    }else{
      result = {
        status: 'error',
        message: 'Unrecognizable Request',
        method: event.method,
        path: event.path
      };
    }

    if(result.status && result.status == 'error'){
      context.fail(JSON.stringify(result));
    }else{
      context.succeed(result);
    }
  })
  .catch(function(ex){
    console.log('*** catch ***');
    console.log(ex);
  });
}
