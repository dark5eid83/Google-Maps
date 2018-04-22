'use strict';
let bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };

  users.validPassword = function(testPass, dbPass) {
      return bcrypt.compareSync(testPass, dbPass);
  };

  return users;
};