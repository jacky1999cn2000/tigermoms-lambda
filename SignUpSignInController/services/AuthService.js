'use strict';

var simplecrypt = require("simplecrypt")({
  password:'password'
});

module.exports = {

  /*
  * hash password
  */
  hashPassword: function(password){
    return simplecrypt.encrypt(password);
  },

  /*
  * compare password
  */
  comparePassword: function(password, hashedPassword){
    return password == simplecrypt.decrypt(hashedPassword);
  }
}
