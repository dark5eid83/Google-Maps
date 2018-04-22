'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };

  users.validPassword = function(testPass, dbPass) {
    //todo make sure you implement this
      return true;
  };

  return users;
};